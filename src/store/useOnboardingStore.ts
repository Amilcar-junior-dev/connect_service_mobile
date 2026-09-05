import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkvStorage';

export interface OnboardingState {
  currentStep: number;
  companyName: string;
  slug: string;
  segment: string;
  teamSize: string;
  serviceType: string;
  zipCode: string;
  city: string;
  state: string;
  address: string;
  isOnboardingCompleted: boolean;

  setCurrentStep: (step: number) => void;
  setStep1Data: (data: { companyName: string; slug: string }) => void;
  setStep2Data: (data: { segment: string; teamSize: string }) => void;
  setStep3Data: (data: { serviceType: string; zipCode?: string; city?: string; state?: string; address?: string }) => void;
  setOnboardingCompleted: (completed: boolean) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      currentStep: 1,
      companyName: '',
      slug: '',
      segment: '',
      teamSize: '',
      serviceType: 'fixed',
      zipCode: '',
      city: '',
      state: '',
      address: '',
      isOnboardingCompleted: false,

      setCurrentStep: (step) => set({ currentStep: step }),
      setStep1Data: (data) => set({ companyName: data.companyName, slug: data.slug }),
      setStep2Data: (data) => set({ segment: data.segment, teamSize: data.teamSize }),
      setStep3Data: (data) =>
        set({
          serviceType: data.serviceType,
          zipCode: data.zipCode ?? '',
          city: data.city ?? '',
          state: data.state ?? '',
          address: data.address ?? '',
        }),
      setOnboardingCompleted: (completed) => set({ isOnboardingCompleted: completed }),
      resetOnboarding: () =>
        set({
          currentStep: 1,
          companyName: '',
          slug: '',
          segment: '',
          teamSize: '',
          serviceType: 'fixed',
          zipCode: '',
          city: '',
          state: '',
          address: '',
          isOnboardingCompleted: false,
        }),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
