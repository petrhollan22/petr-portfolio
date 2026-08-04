'use client';

import { useState } from 'react';
import { workServices, scheduleActivities } from '@/data/services';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Děkuji! Tvoje zpráva byla odeslána na Discord.');
        setFormData({ name: '', email: '', service: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setMessage('Chyba při odesílání. Zkus to prosím později.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Chyba při odesílání. Zkus to prosím později.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6">Kontaktuj mě</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Jméno</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
            placeholder="Tvoje jméno"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
            placeholder="tvuj@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Typ služby / Aktivita</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
          >
            <option value="">Vyber typ služby...</option>
            <optgroup label="Work Services">
              {workServices.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </optgroup>
            <optgroup label="Schedule Time Activities">
              {scheduleActivities.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Zpráva</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
            placeholder="Tvoje zpráva..."
          />
        </div>

        {status === 'success' && (
          <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
            {message}
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full disabled:opacity-50"
        >
          {status === 'loading' ? 'Odesílám...' : 'Odeslat'}
        </button>
      </div>
    </form>
  );
}
