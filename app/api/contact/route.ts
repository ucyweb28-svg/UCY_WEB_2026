import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Champs manquants' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'UCY Studio <contact@ucyweb.fr>',
      to: 'contact@ucyweb.fr',
      replyTo: email,
      subject: `Nouveau message de ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
