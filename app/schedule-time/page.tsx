'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { workServices, scheduleActivities } from '@/data/services';
import ContactForm from '@/components/ContactForm';

function BookingForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get('service');

  const [booking, setBooking] = useState({
    name: '',
    email: '',
    type: 'work' as 'work' | 'activity',
    service: '',
    date: '',
    time: '',
    duration: '60',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!preselected) return;
    const isActivity = scheduleActivities.includes(preselected);
    const isWork = workServices.some((s) => s.name === preselected);
    if (isActivity || isWork) {
      setBooking((prev) => ({
        ...prev,
        type: isActivity ? 'activity' : 'work',
        service: preselected,
      }));
    }
  }, [preselected]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBooking((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'type' ? { service: '' } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });
      if (response.ok) {
        setStatus('success');
        setMessage('Rezervace odeslána. Brzy se ti ozvu s potvrzením.');
        setBooking({
          name: '', email: '', type: 'work', service: '',
          date: '', time: '', duration: '60', message: '',
        });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setMessage('Chyba při odesílání. Zkus to prosím později.');
      }
    } catch {
      setStatus('error');
      setMessage('Chyba při odesílání. Zkus to prosím později.');
    }
  };

  const serviceOptions =
    booking.type === 'work' ? workServices.map((s) => s.name) : scheduleActivities;

  return (
    <form onSubmit={handleSubmit} className="card max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Vytvořit rezervaci</h2>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Jméno *</label>
            <input type="text" name="name" value={booking.name} onChange={handleChange} required
              className="w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              placeholder="Tvoje jméno" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input type="email" name="email" value={booking.email} onChange={handleChange} required
              className="w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              placeholder="tvuj@email.com" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Typ rezervace *</label>
          <select name="type" value={booking.type} onChange={handleChange}
            className="w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none">
            <option value="work">Pracovní služba</option>
            <option value="activity">Sportovní aktivita</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {booking.type === 'work' ? 'Služba' : 'Aktivita'} *
          </label>
          <select name="service" value={booking.service} onChange={handleChange} required
            className="w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none">
            <option value="">Vyber...</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Datum *</label>
            <input type="date" name="date" value={booking.date} onChange={handleChange} required
              className="w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Čas *</label>
            <input type="time" name="time" value={booking.time} onChange={handleChange} required
              className="w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Délka (min) *</label>
            <select name="duration" value={booking.duration} onChange={handleChange}
              className="w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none">
              <option value="30">30 minut</option>
              <option value="60">60 minut</option>
              <option value="90">90 minut</option>
              <option value="120">120 minut</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Další informace</label>
          <textarea name="message" value={booking.message} onChange={handleChange} rows={4}
            className="w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
            placeholder="Cokoli, co bych měl vědět..." />
        </div>

        {status === 'success' && (
          <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">{message}</div>
        )}
        {status === 'error' && (
          <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">{message}</div>
        )}

        <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-50">
          {status === 'loading' ? 'Odesílám...' : 'Rezervovat čas'}
        </button>
      </div>
    </form>
  );
}

export default function ScheduleTimePage() {
  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="container py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text">Rezervuj si čas</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Konzultace, sportovní aktivita nebo šachový trénink — tady si domluvíme termín.
          </p>
        </div>
      </section>

      <section className="container py-8">
        <Suspense fallback={<div className="card max-w-2xl mx-auto text-gray-400">Načítám formulář...</div>}>
          <BookingForm />
        </Suspense>
      </section>

      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nebo se mi napiš</h2>
          <p className="text-gray-400">Pokud ti formulář nevyhovuje, napiš mi přímo:</p>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
