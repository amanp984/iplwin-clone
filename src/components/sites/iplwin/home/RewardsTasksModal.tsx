"use client";

import React from "react";
import { TaskItem, UserProfile } from "@/types/site";
import { CloseIcon, CrownIcon } from "../shared/icons";

interface RewardsTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: TaskItem[];
  user: UserProfile;
  onClaimTask: (taskId: string) => void;
  onLaunchGameById: (gameId: number | string) => void;
}

export function RewardsTasksModal({
  isOpen,
  onClose,
  tasks,
  user,
  onClaimTask,
  onLaunchGameById,
}: RewardsTasksModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#141414] border border-[#333333] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#1A1A1A] border-b border-[#2E2E2E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E9CA78] to-[#D1AE52] p-0.5 flex items-center justify-center">
              <span className="text-black text-lg">🎁</span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>Tasks & Rewards Hub</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#04BE02]/20 text-[#04BE02] border border-[#04BE02]/40 font-bold uppercase">
                  Earn Free Spins
                </span>
              </h3>
              <p className="text-[11px] text-gray-400">
                Complete tasks to earn genuine Free Spins and demo bonuses
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Tasks Modal"
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Free Spins Inventory Banner */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#201808] via-[#1A1A1A] to-[#141414] border-b border-[#2C2618] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CrownIcon className="w-4 h-4 text-[#D1AE52]" />
            <div>
              <span className="text-xs font-bold text-white block">Your Earned Free Spins:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {Object.keys(user.earnedFreeSpins).length === 0 ? (
                  <span className="text-[11px] text-gray-400 italic">
                    No free spins yet. Complete tasks below to earn!
                  </span>
                ) : (
                  Object.entries(user.earnedFreeSpins).map(([gameId, count]) => {
                    if (count <= 0) return null;
                    return (
                      <span
                        key={gameId}
                        className="px-2 py-0.5 rounded bg-[#D1AE52]/20 border border-[#D1AE52]/40 text-[#E9CA78] text-[11px] font-bold"
                      >
                        {count} Spins
                      </span>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {tasks.map((task) => {
            const isCompleted = task.progress >= task.maxProgress;
            const isClaimed = task.claimed;

            return (
              <div
                key={task.id}
                className="p-3.5 sm:p-4 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B] hover:border-[#3D3D3D] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-[#242424] border border-[#333333] flex items-center justify-center text-xl shrink-0">
                    {task.icon}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                      {task.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-snug mb-2">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded-full bg-[#2A2A2A] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#E9CA78] to-[#D1AE52] rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, (task.progress / task.maxProgress) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">
                        {task.progress}/{task.maxProgress}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Reward Pill & Action Button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#2A2A2A]">
                  <span className="px-2.5 py-1 rounded-full bg-[#0A0A0A] border border-[#D1AE52]/40 text-[#D1AE52] text-[11px] font-bold">
                    {task.rewardType === "free_spins"
                      ? `+${task.rewardAmount} Free Spins`
                      : `+₹${task.rewardAmount} Demo`}
                  </span>

                  {isClaimed ? (
                    <button
                      disabled
                      className="px-4 py-1.5 rounded-lg bg-[#252525] text-gray-500 text-xs font-semibold cursor-not-allowed"
                    >
                      Claimed ✓
                    </button>
                  ) : isCompleted ? (
                    <button
                      onClick={() => onClaimTask(task.id)}
                      className="px-5 py-1.5 rounded-lg bg-gradient-to-r from-[#04BE02] to-[#028a01] hover:brightness-110 text-white font-extrabold text-xs shadow-md shadow-[#04BE02]/30 active:scale-95 transition-all"
                    >
                      Claim Now!
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (task.targetGameId) {
                          onLaunchGameById(task.targetGameId);
                          onClose();
                        }
                      }}
                      className="px-4 py-1.5 rounded-lg bg-[#252525] hover:bg-[#333333] text-gray-300 hover:text-white text-xs font-semibold transition-colors"
                    >
                      {task.targetGameId ? "Go Play →" : "In Progress"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-[#111111] border-t border-[#222222] text-center text-[10px] text-gray-500">
          💡 Free spins are only available on eligible games when earned through completed tasks.
        </div>
      </div>
    </div>
  );
}
