import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ApplicationSuccessPage() {
  return (
    <section className="mx-auto flex min-h-[65vh] max-w-3xl items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="w-full rounded-[40px] border border-primary/15 bg-white p-8 shadow-soft sm:p-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-primary">Application received</p>
        <h1 className="mt-4 text-3xl font-semibold text-foreground">Thank you for applying to the Creator Launch Program.</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-cocoa">
          Your application is now in the review pool. Submission does not guarantee selection or paid work. If shortlisted, the team will contact you about a possible next step.
        </p>
        <Button href="/creators" className="mt-8">Explore Creator Roles</Button>
      </div>
    </section>
  );
}
