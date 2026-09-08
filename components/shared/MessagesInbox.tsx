"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { EmptyState } from "@/components/shared/EmptyState";
import { ToolPattern } from "@/components/shared/ToolPattern";

type MessageRow = {
  id: string;
  senderId: string;
  recipientId: string;
  body: string;
  readAt: string | null;
  createdAt: string;
};

export function MessagesInbox({
  userId,
  accountType,
}: {
  userId: string;
  accountType: "candidate" | "employer";
}) {
  const searchParams = useSearchParams();
  const toParam = searchParams.get("to");
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [selectedPeer, setSelectedPeer] = useState<string | null>(toParam);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data.messages ?? []);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (toParam) setSelectedPeer(toParam);
  }, [toParam]);

  const threads = useMemo(() => {
    const map = new Map<
      string,
      { peerId: string; lastBody: string; lastAt: string }
    >();
    for (const msg of messages) {
      const peerId =
        msg.senderId === userId ? msg.recipientId : msg.senderId;
      const existing = map.get(peerId);
      if (!existing || existing.lastAt < msg.createdAt) {
        map.set(peerId, {
          peerId,
          lastBody: msg.body,
          lastAt: msg.createdAt,
        });
      }
    }
    if (toParam && !map.has(toParam)) {
      map.set(toParam, {
        peerId: toParam,
        lastBody: "Start the conversation",
        lastAt: new Date(0).toISOString(),
      });
    }
    return Array.from(map.values()).sort((a, b) =>
      a.lastAt < b.lastAt ? 1 : -1,
    );
  }, [messages, userId, toParam]);

  const threadMessages = useMemo(() => {
    if (!selectedPeer) return [];
    return messages
      .filter(
        (m) =>
          (m.senderId === userId && m.recipientId === selectedPeer) ||
          (m.senderId === selectedPeer && m.recipientId === userId),
      )
      .slice()
      .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  }, [messages, selectedPeer, userId]);

  async function send() {
    if (!selectedPeer || !draft.trim()) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientId: selectedPeer,
          body: draft.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Could not send");
      }
      setDraft("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="grid min-h-[60vh] overflow-hidden rounded-2xl border border-ink/10 bg-card-white lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-ink/10 lg:border-b-0 lg:border-r">
        <div className="border-b border-ink/10 px-4 py-3">
          <h2 className="font-display text-lg font-bold">Inbox</h2>
          <p className="text-xs text-ink/55">
            {accountType === "employer"
              ? "Message candidates from their profiles."
              : "Employers who reach out show up here."}
          </p>
        </div>
        <ul className="max-h-64 overflow-y-auto lg:max-h-[calc(60vh-64px)]">
          {threads.length === 0 ? (
            <li className="px-4 py-6 text-sm text-ink/55">No threads yet.</li>
          ) : (
            threads.map((thread) => (
              <li key={thread.peerId}>
                <button
                  type="button"
                  onClick={() => setSelectedPeer(thread.peerId)}
                  className={`block w-full px-4 py-3 text-left transition hover:bg-workshop-white ${
                    selectedPeer === thread.peerId ? "bg-workshop-white" : ""
                  }`}
                >
                  <p className="truncate text-sm font-semibold text-ink">
                    Conversation
                  </p>
                  <p className="truncate text-xs text-ink/55">
                    {thread.lastBody}
                  </p>
                </button>
              </li>
            ))
          )}
        </ul>
      </aside>

      <div className="relative flex min-h-[360px] flex-col">
        {!selectedPeer ? (
          <div className="relative flex flex-1 items-center justify-center p-6">
            <ToolPattern />
            <div className="relative w-full max-w-md">
              <EmptyState
                patterned={false}
                title="Pick a conversation"
                description={
                  accountType === "employer"
                    ? "Open a candidate profile and hit Message to start a thread."
                    : "When an employer messages you, the thread will land here."
                }
                actionLabel={
                  accountType === "employer" ? "Browse candidates" : undefined
                }
                actionHref={
                  accountType === "employer" ? "/employer/dashboard" : undefined
                }
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {loading ? (
                <p className="text-sm text-ink/55">Loading…</p>
              ) : threadMessages.length === 0 ? (
                <p className="text-sm text-ink/55">
                  Say hello. Keep it short and clear.
                </p>
              ) : (
                threadMessages.map((msg) => {
                  const mine = msg.senderId === userId;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${mine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
                          mine
                            ? "bg-signal-orange text-white"
                            : "bg-workshop-white text-ink"
                        }`}
                      >
                        {msg.body}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="border-t border-ink/10 p-3">
              {error ? (
                <p className="mb-2 text-sm text-signal-orange">{error}</p>
              ) : null}
              <div className="flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Write a message…"
                  className="flex-1 rounded-md border border-ink/15 bg-workshop-white px-3 py-2.5 text-sm outline-none focus:border-steel-blue"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send();
                    }
                  }}
                />
                <Button onClick={send} disabled={sending || !draft.trim()}>
                  Send
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
