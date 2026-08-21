'use client';

import React from 'react';
import { FaExclamationTriangle, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = true,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-dark border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <div className="flex items-start space-x-4 mb-4">
          <div className={`p-3 rounded-2xl flex-shrink-0 ${isDanger ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
            <FaExclamationTriangle className="text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold border border-slate-800 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 shadow-md transition-all ${
              isDanger
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-glow-pink'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-glow-gold'
            }`}
          >
            {isDanger ? <FaTrash className="text-xs" /> : <FaCheck className="text-xs" />}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
