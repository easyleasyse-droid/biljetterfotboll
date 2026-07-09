import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Globe } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans py-20 px-6 sm:px-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-500 hover:text-blue-400 transition-colors group">
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
          Tillbaka till startsidan
        </Link>

        <div className="space-y-3 border-b border-slate-800 pb-6">
          <div className="inline-flex p-2.5 bg-blue-600/10 rounded-xl text-blue-500 border border-blue-500/20 mb-2">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight sm:text-4xl">Kontakta Redaktionen</h1>
          <p className="text-xs text-slate-500 font-bold tracking-wider uppercase">Support & Samarbete</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed font-medium">
          <p>
            Har du frågor gällande vår jämförelsetjänst, förslag på förbättringar eller vill du diskutera partnerskap? Vi på <strong>Biljetterfotboll.se</strong> tar tacksamt emot din feedback.
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-md">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">E-post</p>
                <p className="text-sm font-bold text-white">info@biljetterfotboll.se</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-800/60 pt-4">
              <Globe className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Svarstid</p>
                <p className="text-sm font-bold text-white">Vi svarar normalt inom 24 timmar.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}