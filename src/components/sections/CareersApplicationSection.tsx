'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type FieldConfig = {
  label: string;
  name: string;
  placeholder?: string;
  type?: 'text' | 'textarea' | 'email' | 'select';
  options?: { label: string; value: string }[];
  required?: boolean;
  validate?: (value: string) => string | null;
};

const SUBMISSION_ENDPOINT = '/api/applications';

const stepConfig: Array<{
  title: string;
  description: string;
  fields: FieldConfig[];
}> = [
  {
    title: 'Personal Basics',
    description: 'Quick context about who you are and how we reference you internally.',
    fields: [
      {
        label: 'Full Name',
        name: 'fullName',
        placeholder: 'Your preferred full name',
        required: true,
        validate: (value) =>
          /^[A-Za-z\s]{3,}$/.test(value.trim()) ? null : 'Use at least 3 alphabetic characters.'
      },
      {
        label: 'Preferred Pronouns',
        name: 'pronouns',
        placeholder: 'She/Her, They/Them, etc.',
        required: true,
        validate: (value) =>
          /^[A-Za-z/,\s]{3,}$/.test(value.trim()) ? null : 'Use letters, slashes, or commas only.'
      },
      {
        label: 'Current Location (Delhi NCR)',
        name: 'location',
        placeholder: 'Neighbourhood + city',
        required: true,
        validate: (value) => (value.trim().length >= 3 ? null : 'Add your neighbourhood or city.')
      }
    ]
  },
  {
    title: 'Hosting Readiness',
    description: 'Your on-camera comfort and the languages or themes you enjoy.',
    fields: [
      {
        label: 'Primary Languages',
        name: 'languages',
        placeholder: 'e.g., Hindi, English',
        required: true,
        validate: (value) =>
          /^[A-Za-z,\s]{3,}$/.test(value.trim()) ? null : 'Separate languages with commas.'
      },
      {
        label: 'Past Livestream / Content Experience',
        name: 'experience',
        placeholder: 'Mention platforms, brand work, or projects (use N/A if none)',
        type: 'textarea',
        required: true,
        validate: (value) => (value.trim().length >= 3 ? null : 'Add a short note or N/A.')
      },
      {
        label: 'Comfort Zones / Topics',
        name: 'comfortZones',
        placeholder: 'Beauty, tech, wellness, education...',
        required: true,
        validate: (value) => (value.trim().length >= 3 ? null : 'List at least one topic.')
      }
    ]
  },
  {
    title: 'Scheduling & Logistics',
    description: 'Help us slot you into the right tier and timing block.',
    fields: [
      {
        label: 'Availability Window (hrs/week)',
        name: 'availability',
        type: 'select',
        required: true,
        options: [
          { label: 'Select an availability window', value: '' },
          { label: 'Weekday mornings · 6–10 AM', value: 'weekday-morning' },
          { label: 'Weekday evenings · 6–10 PM', value: 'weekday-evening' },
          { label: 'Weekend blocks · 2–6 PM', value: 'weekend' },
          { label: 'Flexible / custom hours', value: 'flexible' }
        ]
      },
      {
        label: 'Preferred Tier',
        name: 'preferredTier',
        type: 'select',
        required: true,
        options: [
          { label: 'Select a tier', value: '' },
          { label: 'Intro Sessions', value: 'intro' },
          { label: 'Enhanced Sessions', value: 'enhanced' },
          { label: 'Signature Sessions', value: 'signature' }
        ]
      },
      {
        label: 'Best Email / Phone',
        name: 'contact',
        placeholder: 'we’ll reach out within 48h',
        type: 'text',
        required: true,
        validate: (value) => {
          const trimmed = value.trim();
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const phonePattern = /^[0-9]{10,13}$/;
          if (emailPattern.test(trimmed) || phonePattern.test(trimmed)) {
            return null;
          }
          return 'Enter a valid phone number or email.';
        }
      }
    ]
  }
];

const initialFormState = stepConfig.reduce<Record<string, string>>((acc, step) => {
  step.fields.forEach((field) => {
    acc[field.name] = '';
  });
  return acc;
}, {});

export const CareersApplicationSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [openSelect, setOpenSelect] = useState<string | null>(null);
  const totalSteps = stepConfig.length;

  const currentStepConfig = stepConfig[currentStep];
  const progressPercentage = useMemo(() => ((currentStep + 1) / totalSteps) * 100, [currentStep, totalSteps]);

  const allFields = useMemo(() => stepConfig.flatMap((step) => step.fields), []);

  const runValidation = (fieldName: string, value: string) => {
    const field = allFields.find((config) => config.name === fieldName);
    if (!field) return null;
    if (field.required && !value.trim()) {
      return `Please enter ${field.label.toLowerCase()}.`;
    }
    if (field.validate) {
      return field.validate(value) ?? null;
    }
    return null;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = runValidation(field, value);
      setErrors((prev) => ({ ...prev, [field]: error ?? '' }));
    }
  };

  const markTouched = (fieldName: string) =>
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

  const validateFields = (fields: FieldConfig[]) => {
    const nextErrors: Record<string, string> = {};
    fields.forEach((field) => {
      markTouched(field.name);
      const error = runValidation(field.name, formData[field.name]);
      if (error) {
        nextErrors[field.name] = error;
      }
    });
    setErrors((prev) => {
      const updated = { ...prev };
      fields.forEach((field) => delete updated[field.name]);
      return { ...updated, ...nextErrors };
    });
    return Object.keys(nextErrors).length === 0;
  };

  const validateAllFields = () => {
    const aggregated: Record<string, string> = {};
    allFields.forEach((field) => {
      markTouched(field.name);
      const error = runValidation(field.name, formData[field.name]);
      if (error) aggregated[field.name] = error;
    });
    setErrors(aggregated);
    if (Object.keys(aggregated).length > 0) {
      const invalidStepIndex = stepConfig.findIndex((step) =>
        step.fields.some((field) => aggregated[field.name])
      );
      if (invalidStepIndex >= 0) {
        setCurrentStep(invalidStepIndex);
      }
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateFields(currentStepConfig.fields)) {
      return;
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setFeedbackMessage('');

    try {
      if (!validateAllFields()) {
        setStatus('idle');
        return;
      }

      if (!SUBMISSION_ENDPOINT) {
        throw new Error('Application endpoint is not configured.');
      }

      const response = await fetch(SUBMISSION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString()
        })
      });

      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? 'Unable to submit application right now.');
      }

      setStatus('success');
      setFeedbackMessage('Your application is in. A producer will reply within 48 working hours with the next steps.');
      setFormData(initialFormState);
    } catch (error) {
      setStatus('error');
      setFeedbackMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again shortly.');
    }
  };

  return (
    <SectionWrapper id="application" className="text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Step-by-Step Application</p>
      <h2 className="mt-4 text-3xl font-semibold text-foreground">Three guided steps before your discovery session.</h2>
      <p className="mt-3 text-base text-slate-600">Share concise details across {totalSteps} stages. Every submission is reviewed manually.</p>

      <div className="mx-auto mt-10 max-w-3xl">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>Application Overview</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-foreground transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-4">
        {stepConfig.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep || status === 'success';
          return (
            <div key={step.title} className="flex flex-col items-center text-xs">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${
                  isActive ? 'border-foreground bg-foreground text-white' : isCompleted ? 'border-foreground text-foreground' : 'border-slate-200 text-slate-400'
                }`}
              >
                {index + 1}
              </div>
              <p className={`mt-2 text-[0.65rem] uppercase tracking-[0.3em] ${isActive ? 'text-foreground' : 'text-slate-400'}`}>{step.title}</p>
            </div>
          );
        })}
      </div>

      <Card className="mx-auto mt-8 max-w-4xl text-left">
        {status === 'success' ? (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" aria-hidden />
            </div>
            <p className="text-2xl font-semibold text-foreground">Application received.</p>
            <p className="text-sm text-emerald-600">{feedbackMessage}</p>
            <Button type="button" onClick={() => { setStatus('idle'); setCurrentStep(0); }}>
              Submit another response
            </Button>
          </div>
        ) : status === 'error' ? (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <AlertTriangle className="h-12 w-12 text-red-500" aria-hidden />
            </div>
            <p className="text-2xl font-semibold text-foreground">We couldn’t submit that.</p>
            <p className="text-sm text-red-500">{feedbackMessage}</p>
            <Button type="button" onClick={() => setStatus('idle')}>
              Try Again
            </Button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">{currentStepConfig.title}</p>
              <p className="mt-2 text-sm text-slate-500">{currentStepConfig.description}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {currentStepConfig.fields.map((field, index) => {
                const isWide = field.type === 'textarea' || field.name === 'languages' || (currentStepConfig.fields.length === 3 && index === 2);
                const commonProps = {
                  id: field.name,
                  name: field.name,
                  value: formData[field.name],
                  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                    handleChange(field.name, event.target.value),
                  onBlur: () => {
                    markTouched(field.name);
                    const error = runValidation(field.name, formData[field.name]);
                    setErrors((prev) => ({ ...prev, [field.name]: error ?? '' }));
                  },
                  placeholder: field.placeholder,
                  className:
                    `w-full rounded-2xl border bg-white px-4 py-3 text-sm text-foreground placeholder:text-slate-400 focus:outline-none focus:ring-0 min-h-[52px] ${
                      errors[field.name] ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-foreground'
                    }`,
                  required: true
                };

                if (field.type === 'textarea') {
                  return (
                    <div key={field.name} className="md:col-span-2">
                      <label htmlFor={field.name} className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                        {field.label}
                        {field.required && <span className="ml-1 text-red-500">*</span>}
                      </label>
                      <div className="relative">
                        <textarea {...commonProps} rows={4} className={`${commonProps.className} pr-10`} />
                        {touched[field.name] && !errors[field.name] && (
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" size={16} aria-hidden />
                        )}
                        {touched[field.name] && errors[field.name] && (
                          <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={16} aria-hidden />
                        )}
                      </div>
                      {errors[field.name] && <p className="mt-1 text-xs text-red-500">{errors[field.name]}</p>}
                    </div>
                  );
                }

                if (field.type === 'select') {
                  const selectedLabel =
                    field.options?.find((option) => option.value === formData[field.name])?.label || field.options?.[0]?.label;
                  return (
                    <div key={field.name} className={isWide ? 'md:col-span-2' : undefined}>
                      <label htmlFor={field.name} className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                        {field.label}
                        {field.required && <span className="ml-1 text-red-500">*</span>}
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          className={`${commonProps.className} flex w-full items-center justify-between pr-12 text-left`}
                          onClick={() => setOpenSelect(openSelect === field.name ? null : field.name)}
                        >
                          <span className="truncate">{selectedLabel}</span>
                          <span className={`pointer-events-none transition-transform ${openSelect === field.name ? 'rotate-180' : ''}`}>
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 1L6 6L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </button>
                        {openSelect === field.name && (
                          <div className="absolute z-10 mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-lg">
                            {field.options?.map((option) => (
                              <button
                                type="button"
                                key={option.value}
                                className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm ${
                                  formData[field.name] === option.value ? 'bg-slate-100 text-foreground' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                                onClick={() => {
                                  handleChange(field.name, option.value);
                                  setOpenSelect(null);
                                  markTouched(field.name);
                                  const error = runValidation(field.name, option.value);
                                  setErrors((prev) => ({ ...prev, [field.name]: error ?? '' }));
                                }}
                              >
                                <span>{option.label}</span>
                                {formData[field.name] === option.value && <CheckCircle className="text-emerald-500" size={16} aria-hidden />}
                              </button>
                            ))}
                          </div>
                        )}
                        {touched[field.name] && !errors[field.name] && (
                          <CheckCircle className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" size={16} aria-hidden />
                        )}
                        {touched[field.name] && errors[field.name] && (
                          <XCircle className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={16} aria-hidden />
                        )}
                      </div>
                      {errors[field.name] && <p className="mt-1 text-xs text-red-500">{errors[field.name]}</p>}
                    </div>
                  );
                }

                return (
                  <div key={field.name} className={isWide ? 'md:col-span-2' : undefined}>
                    <label htmlFor={field.name} className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                      {field.label}
                      {field.required && <span className="ml-1 text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <input {...commonProps} type={field.type ?? 'text'} className={`${commonProps.className} pr-10`} />
                      {touched[field.name] && !errors[field.name] && (
                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" size={16} aria-hidden />
                      )}
                      {touched[field.name] && errors[field.name] && (
                        <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={16} aria-hidden />
                      )}
                    </div>
                    {errors[field.name] && <p className="mt-1 text-xs text-red-500">{errors[field.name]}</p>}
                  </div>
                );
              })}
            </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Step {currentStep + 1} / {totalSteps}</p>
          <div className="flex flex-wrap justify-end gap-3">
            <Button type="button" variant="ghost" onClick={handlePrev} disabled={currentStep === 0}>
              Back
            </Button>
            {currentStep < totalSteps - 1 ? (
              <Button type="button" onClick={handleNext}>
                Save & Continue
              </Button>
            ) : (
              <Button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Submitting...' : 'Submit Application'}
              </Button>
            )}
            </div>
          </div>
        </form>
        )}
      </Card>
    </SectionWrapper>
  );
};
