
import React, { useState, useEffect } from 'react';
import { db } from '../../lib/supabase';

interface LoginPageProps {
  onLogin: () => void;
  onCancel: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    
    try {
      await db.auth.signIn(email, password);
      onLogin();
    } catch (err: any) {
      setErrorMsg(err.message || 'Login gagal. Cek kembali email & password Anda.');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] bg-[#0f172a] flex items-center justify-center p-4 font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md bg-[#1e293b]/50 backdrop-blur-2xl border border-slate-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-orange-600 to-amber-400 rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-lg mb-6 transform -rotate-6">
            🛡️
          </div>
          <h2 className="text-3xl font-black text-white mb-2">Login Secure</h2>
          <p className="text-slate-500 text-sm font-medium">Gunakan kredensial admin Supabase Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Admin</label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ganesamas.com"
              className="w-full bg-[#0f172a] border border-slate-800 focus:border-orange-500 rounded-2xl px-6 py-4 text-white outline-none transition-all text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#0f172a] border border-slate-800 focus:border-orange-500 rounded-2xl px-6 py-4 text-white outline-none transition-all text-sm"
            />
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
              <p className="text-red-500 text-[10px] font-bold text-center uppercase leading-relaxed tracking-wider">{errorMsg}</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-500 transition-all shadow-xl shadow-orange-900/40 active:scale-95 disabled:opacity-50 mt-4"
          >
            {isLoading ? 'MENGOTENTIKASI...' : 'MASUK KE DASHBOARD'}
          </button>
        </form>

        <button 
          onClick={onCancel}
          className="w-full mt-6 text-slate-500 hover:text-white font-bold text-[10px] uppercase tracking-widest transition-colors"
        >
          Batal & Kembali ke Situs
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
