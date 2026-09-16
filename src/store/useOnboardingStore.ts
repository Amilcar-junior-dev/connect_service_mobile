import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkvStorage';

export interface DayHours {
  active: boolean;
  startHours: number;
  startMinutes: number;
  endHours: number;
  endMinutes: number;
}

export interface OnboardingState {
  currentStep: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  specialization: string;
  workplaceName: string;
  zipCode: string;
  city: string;
  state: string;
  address: string;
  operatingHours: Record<string, DayHours>;
  isOnboardingCompleted: boolean;

  setCurrentStep: (step: number) => void;
  setStep1Data: (data: { firstName: string; lastName?: string; avatarUrl?: string }) => void;
  setStep2Data: (data: { specialization: string }) => void;
  setStep3Data: (data: { workplaceName?: string; zipCode?: string; city?: string; state?: string; address?: string }) => void;
  setStep4Data: (data: { operatingHours: Record<string, DayHours> }) => void;
  setOnboardingCompleted: (completed: boolean) => void;
  resetOnboarding: () => void;
}

const DEFAULT_OPERATING_HOURS: Record<string, DayHours> = {
  domingo: { active: false, startHours: 9, startMinutes: 0, endHours: 18, endMinutes: 0 },
  segunda: { active: true, startHours: 9, startMinutes: 0, endHours: 18, endMinutes: 0 },
  terca: { active: true, startHours: 9, startMinutes: 0, endHours: 18, endMinutes: 0 },
  quarta: { active: true, startHours: 9, startMinutes: 0, endHours: 18, endMinutes: 0 },
  quinta: { active: true, startHours: 9, startMinutes: 0, endHours: 18, endMinutes: 0 },
  sexta: { active: true, startHours: 9, startMinutes: 0, endHours: 18, endMinutes: 0 },
  sabado: { active: true, startHours: 9, startMinutes: 0, endHours: 18, endMinutes: 0 },
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      currentStep: 1,
      firstName: '',
      lastName: '',
      avatarUrl: '',
      specialization: '',
      workplaceName: '',
      zipCode: '',
      city: '',
      state: '',
      address: '',
      operatingHours: DEFAULT_OPERATING_HOURS,
      isOnboardingCompleted: false,

      setCurrentStep: (step) => set({ currentStep: step }),
      setStep1Data: (data) =>
        set({
          firstName: data.firstName,
          lastName: data.lastName ?? '',
          avatarUrl: data.avatarUrl ?? '',
        }),
      setStep2Data: (data) => set({ specialization: data.specialization }),
      setStep3Data: (data) =>
        set({
          workplaceName: data.workplaceName ?? '',
          zipCode: data.zipCode ?? '',
          city: data.city ?? '',
          state: data.state ?? '',
          address: data.address ?? '',
        }),
      setStep4Data: (data) => set({ operatingHours: data.operatingHours }),
      setOnboardingCompleted: (completed) => set({ isOnboardingCompleted: completed }),
      resetOnboarding: () =>
        set({
          currentStep: 1,
          firstName: '',
          lastName: '',
          avatarUrl: '',
          specialization: '',
          workplaceName: '',
          zipCode: '',
          city: '',
          state: '',
          address: '',
          operatingHours: DEFAULT_OPERATING_HOURS,
          isOnboardingCompleted: false,
        }),
    }),
    {
      name: 'onboarding-storage-v2',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
