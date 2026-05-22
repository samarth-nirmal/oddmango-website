import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Shield, Scale, Info, Check } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab: 'privacy' | 'terms' | 'cookies';
}

export function LegalModal({ isOpen, onClose, defaultTab }: LegalModalProps) {
  const [activeTab, setActiveTab] = React.useState<'privacy' | 'terms' | 'cookies'>(defaultTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'privacy' as const, label: 'Privacy Policy', icon: Shield },
    { id: 'terms' as const, label: 'Terms of Service', icon: Scale },
    { id: 'cookies' as const, label: 'Cookie Policy', icon: Info },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-sans">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0A0A0A]/85 backdrop-blur-md cursor-crosshair"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl h-[85vh] md:h-[80vh] bg-[#F7F7F5] text-midnight rounded-[2rem] border border-midnight/10 shadow-2xl overflow-hidden flex flex-col m-4"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Top Header */}
        <div className="px-6 md:px-10 py-6 border-b border-midnight/10 flex justify-between items-center bg-[#F1F1EE]">
          <div>
            <span className="text-[10px] font-normal tracking-[0.25em] text-midnight/60 uppercase">Odd Mango Studio</span>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-midnight mt-0.5">Legal Documentation</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-midnight/10 flex items-center justify-center hover:bg-midnight hover:text-cloud hover:border-midnight transition-all duration-300"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Side Tabs */}
          <div className="w-full md:w-64 bg-[#F1F1EE] p-4 md:p-6 border-b md:border-b-0 md:border-r border-midnight/10 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible shrink-0 items-center md:items-stretch">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap md:whitespace-normal w-auto md:w-full ${
                    isActive
                      ? 'bg-midnight text-cloud shadow-md'
                      : 'text-midnight/60 hover:text-midnight hover:bg-[#E6E4DD]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Panels */}
          <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 selection:bg-mango selection:text-midnight">
            {activeTab === 'privacy' && (
              <div className="space-y-6 text-midnight/80 text-sm md:text-base leading-relaxed">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-midnight tracking-tight">Privacy Policy</h3>
                  <p className="text-xs text-midnight/50 font-mono">Last updated: May 20, 2026</p>
                </div>
                
                <p>
                  At Odd Mango Studio, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines the types of data we collect, how we use it, and the safeguarding measures we employ when you visit our website or interact with our creative services.
                </p>

                <hr className="border-midnight/10" />

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-midnight select-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-mango" /> 1. Information Collection
                  </h4>
                  <p>
                    We collect primary and secondary metrics to deliver dynamic visual experiences:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-midnight/70">
                    <li><strong>Contact details:</strong> Your name, business entity, and email address shared voluntarily via interactive forms or direct communications.</li>
                    <li><strong>Device data:</strong> Anonymized analytical parameters such as browser types, device profiles, approximate geographical locations, and scrolling mechanics.</li>
                    <li><strong>Project briefs:</strong> Collaborative ideas, timeline considerations, and media preferences supplied via visual assessment pipelines.</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-midnight select-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-mango" /> 2. Utilization of Data
                  </h4>
                  <p>
                    The collected telemetry handles various essential production aspects:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-midnight/70">
                    <li>Optimizing core animation performance and responsive viewport adaptations on the site.</li>
                    <li>Responding to formal visual media, cinematic production, or experimental motion capture requests.</li>
                    <li>Enhancing high-quality interactive assets and tailoring typography and presentation layouts.</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-midnight select-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-mango" /> 3. Data Protection
                  </h4>
                  <p>
                    We implement standard industry-level encryption protocols and architectural access security limits. Your voluntarily supplied files and portfolio assets are maintained inside encrypted virtual networks with custom-validated session authorizations.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-midnight select-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-mango" /> 4. Third-Party Integrations
                  </h4>
                  <p>
                    We do not sell, rent, or trade your identifiable information. However, some performance tracking cookies may compile visual telemetry via automated pipelines to measure engagement rates and loading speeds.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-midnight select-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-mango" /> 5. Contact Information
                  </h4>
                  <p>
                    For inquiries, clarification, or records deletion requests, kindly reach our compliance supervisor via email at <span className="underline font-medium">privacy@oddman.go</span> or submit a direct inquiry on the Contact page.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-6 text-midnight/80 text-sm md:text-base leading-relaxed">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-midnight tracking-tight">Terms of Service</h3>
                  <p className="text-xs text-midnight/50 font-mono">Last updated: May 20, 2026</p>
                </div>

                <p>
                  Welcome to Odd Mango Studio. By accessing our website, creative assets, and specialized micro-interactions, you agree to comply with and be bound by the following Terms of Service.
                </p>

                <hr className="border-midnight/10" />

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-midnight select-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-mango" /> 1. Proprietary Media Licensing
                  </h4>
                  <p>
                    All typographic layouts, motion prototypes, cinematic shorts, dynamic carousels, and custom source files displayed on this site are the exclusive intellectual property of Odd Mango Studio, or licensed specifically to our creative clients. Unlawful distribution, raw file replication, or direct hotlinking without written consent is strictly prohibited.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-midnight select-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-mango" /> 2. Workspace Acceptable Use
                  </h4>
                  <p>
                    When navigating or testing interactive widgets on this site:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-midnight/70">
                    <li>You agree not to bypass layout frames or run automated extraction scrapers on media assets.</li>
                    <li>You agree not to inject harmful scripts, payload strings, or malicious tags via the contact forms.</li>
                    <li>You agree to respect local sandbox bounds and viewport layout definitions.</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-midnight select-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-mango" /> 3. Service Limitations
                  </h4>
                  <p>
                    Our dynamic visuals, animated carousels, and interactive demos are offered on an "as-is" and "as-available" basis. Odd Mango Studio disclaims all representations or absolute operational guarantees of persistent speed, cross-browser exactness, or latency ratios.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-midnight select-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-mango" /> 4. Amendments to Terms
                  </h4>
                  <p>
                    We reserve absolute authority to alter, replace, or prune terms at our discretion to align with updated creative regulations or platform scaling demands. Continued use of this site constitutes acknowledgement of updated guidelines.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'cookies' && (
              <div className="space-y-6 text-midnight/80 text-sm md:text-base leading-relaxed">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-midnight tracking-tight">Cookie Policy</h3>
                  <p className="text-xs text-midnight/50 font-mono">Last updated: May 20, 2026</p>
                </div>

                <p>
                  Odd Mango Studio utilizes essential cookies, design telemetry, and performance tracking scripts. This Cookie Policy explains why they are used and how to manage their behaviors on your device.
                </p>

                <hr className="border-midnight/10" />

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-midnight select-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-mango" /> What are Cookies?
                  </h4>
                  <p>
                    Cookies are microscopic text files stored temporarily by your browser. They enable specialized visual preferences, responsive dimensions, and motion settings to load instantly when you navigate back to our site.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-midnight select-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-mango" /> Categorized Cookies We Deploy
                  </h4>
                  <ul className="list-disc pl-5 space-y-3 text-midnight/70">
                    <li>
                      <strong>Necessary (Functional) Cookies:</strong> Essential for processing high-performance Framer Motion matrices, smooth Lenis-scrolling calculations, and high-DPI image optimizations.
                    </li>
                    <li>
                      <strong>Design Analytics Cookies:</strong> Used to map approximate navigation behaviors so we can refine and expand high-quality tactile layouts over time.
                    </li>
                    <li>
                      <strong>Thematic / Accent Storing Cookies:</strong> Save user decisions (such as motion speeds and interactive triggers) during persistent client sessions.
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-midnight select-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-mango" /> Managing Preferences
                  </h4>
                  <p>
                    Most desktop and mobile browsers accept tracking cookies automatically. If you wish to reject them, you can alter local browser profiles to block specific trackers, though some dynamic transitions, custom layouts, or interactive components may experience slightly increased latency.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info inside modal */}
        <div className="py-4 px-6 md:px-10 bg-[#E6E4DD] border-t border-midnight/10 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono tracking-widest uppercase text-midnight/60 text-center gap-2">
          <span>Odd Mango Creative Studio © 2026</span>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-mango" />
            <span>GDPR/CCPA Compliant</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
