import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useAppointments() {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const [success, setSuccess] = useState(false)

  const bookAppointment = async (formData) => {
    setLoading(true)
    setError(null)

    const { error: dbErr } = await supabase.from('appointments').insert([{
      name:           formData.name,
      email:          formData.email,
      phone:          formData.phone,
      service_type:   formData.serviceType,
      preferred_date: formData.preferredDate,
      preferred_time: formData.preferredTime,
      notes:          formData.notes,
      is_emergency:   formData.isEmergency ?? false,
      status:         'pending',
    }])

    if (dbErr) {
      setError(dbErr.message)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  return { bookAppointment, loading, error, success, setSuccess }
}
