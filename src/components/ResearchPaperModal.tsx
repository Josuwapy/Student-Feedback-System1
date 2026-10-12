import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Check, 
  Copy, 
  ExternalLink, 
  X, 
  BookOpen, 
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface ResearchPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearchPaperModal: React.FC<ResearchPaperModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    const url = window.location.origin + '/Torres_Capitol_College_Student_Feedback_System_Research_Paper.doc';
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.open('/RESEARCH_PAPER.html', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-xl border border-slate-200/90 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold tracking-tight">
                Academic Research Paper & Capstone Docs
              </h2>
              <p className="text-xs text-slate-300">
                Torres Capitol College · ISO/IEC 25010 Evaluated (x̄ = 4.88)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          {/* Paper Info Summary */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4.5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Full Manuscript Ready for Download</span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
              Development and Implementation of a Web-Based Student Feedback and Resolution Tracking System for Torres Capitol College
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standard 5-Chapter Thesis / CHED-compliant & IMRaD research paper with Introduction, Related Literature (RRL/RRS), Agile SDLC Methodology, ISO/IEC 25010 Evaluation Results, State Transitions, and APA 7th References.
            </p>
          </div>

          {/* Download Options */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Choose Download Format
            </h4>

            {/* Word DOC */}
            <a
              href="/Torres_Capitol_College_Student_Feedback_System_Research_Paper.doc"
              download="Torres_Capitol_College_Student_Feedback_System_Research_Paper.doc"
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  DOC
                </div>
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-indigo-950 text-xs sm:text-sm">
                    Microsoft Word Document (.doc)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Styled for Word, Google Docs & LibreOffice with tables & headers
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold group-hover:bg-indigo-700 shadow-2xs">
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </div>
            </a>

            {/* Markdown MD */}
            <a
              href="/Torres_Capitol_College_Student_Feedback_System_Research_Paper.md"
              download="Torres_Capitol_College_Student_Feedback_System_Research_Paper.md"
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                  MD
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                    Markdown Manuscript (.md)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Clean plain-text markdown, ideal for GitHub, Obsidian, or VS Code
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-semibold group-hover:bg-slate-100 shadow-2xs">
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </div>
            </a>

            {/* HTML / Print View */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  PDF
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                    View & Print to PDF
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Opens styled print layout; press Ctrl+P / Cmd+P to Save as PDF
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 shadow-2xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / View</span>
              </button>
            </div>
          </div>

          {/* Quick Copy Link */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Also saved in repo root as <code>RESEARCH_PAPER.md</code></span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Direct Download Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
