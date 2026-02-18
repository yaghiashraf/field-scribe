# FieldScribe

**Turn site photos and messy voice notes into professional, liability-proof inspection reports in seconds.**

FieldScribe is a Next.js application that uses AI (Hugging Face models) to analyze photos, transcribe voice notes, and generate professional inspection reports.

## Features

- **AI Vision Analysis:** Auto-detects defects in uploaded photos using `Qwen/Qwen2.5-VL-7B-Instruct`.
- **Voice-to-Report:** Transcribes voice notes using `openai/whisper-large-v3-turbo`.
- **Professional Reports:** Generates structured reports using `mistralai/Mistral-7B-Instruct-v0.3`.
- **One-Time Payment:** Integrated with Stripe for lifetime access.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Lucide React
- **AI:** Hugging Face Inference API
- **Payments:** Stripe
- **Deployment:** Vercel

## Environment Variables

To deploy this application, you must set the following Environment Variables in your Vercel Project Settings:

```bash
# Hugging Face (Get token at https://huggingface.co/settings/tokens)
HF_ACCESS_TOKEN=hf_...

# Stripe (Get keys at https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_ID=price_...
```

## Local Development

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Set up `.env.local` (see `.env.local.example`).
4.  Run development server: `npm run dev`

## Deployment

1.  Push this repository to GitHub.
2.  Go to [Vercel](https://vercel.com/new).
3.  Import the `field-scribe` repository.
4.  Add the Environment Variables listed above.
5.  Click **Deploy**.
