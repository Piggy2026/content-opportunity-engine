import React, { useEffect, useState } from 'react';
import { X, FolderArchive, Trash2, ArrowRight, Calendar, Compass, RefreshCw } from 'lucide-react';
import { ProjectSummary } from '../types/index.js';
import { fetchSavedProjects, deleteProjectById } from '../lib/api.js';
import { useLanguage } from '../i18n/LanguageContext.js';

interface SavedProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (id: string) => void;
}

export const SavedProjectsModal: React.FC<SavedProjectsModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSavedProjects();
      setProjects(data);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadProjects();
    }
  }, [isOpen]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(t.savedProjectsModal.confirmDelete)) {
      await deleteProjectById(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FolderArchive className="w-5 h-5 text-brand-400" />
            <h3 className="font-bold text-lg text-white">{t.savedProjectsModal.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {isLoading ? (
            <div className="py-12 text-center text-slate-400">{t.savedProjectsModal.loading}</div>
          ) : projects.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Compass className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-400">{t.savedProjectsModal.emptyTitle}</p>
              <p className="text-xs text-slate-500">
                {t.savedProjectsModal.emptySubtitle}
              </p>
            </div>
          ) : (
            projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  onSelectProject(proj.id);
                  onClose();
                }}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-brand-500/60 transition cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white group-hover:text-brand-300 transition">
                      {proj.topic}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {proj.market} • {proj.platform}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {t.savedProjectsModal.bestIdeaLabel} <span className="text-slate-300">{proj.bestIdeaTitle}</span>
                  </p>
                  <div className="flex items-center space-x-3 text-[11px] text-slate-500 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(proj.createdAt).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>Score: {proj.opportunityScore}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => handleDelete(proj.id, e)}
                    className="p-2 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition"
                    title={t.savedProjectsModal.deleteTooltip}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
