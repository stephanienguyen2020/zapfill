"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ProfileInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  street: string;
  aptNumber: string;
  city: string;
  state: string;
  zipCode: string;
  signature: string | null;
  ssn: string;
  dob: string;
  gender: string;
  driversLicense: string;
  stateId: string;
  passport: string;
  nationality: string;
  jobTitle: string;
  employerName: string;
  workEmail: string;
  workAddress: string;
  netWorth: string;
  salaryRange: string;
  bankName: string;
  accountNumber: string;
  workStreet: string;
  workAptNumber: string;
  workCity: string;
  workState: string;
  workZipCode: string;
}

interface ProfileContextType {
  profileInfo: ProfileInfo;
  updateProfileInfo: (info: Partial<ProfileInfo>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    firstName: "Stephanie",
    lastName: "Ng",
    email: "stephanie@gmail.com",
    phoneNumber: "(555) 123-4567",
    street: "123 Main St",
    aptNumber: "",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    signature: null,
    ssn: "123-45-6789",
    dob: "2000-09-24",
    gender: "female",
    driversLicense: "",
    stateId: "",
    passport: "",
    nationality: "",
    jobTitle: "",
    employerName: "",
    workEmail: "",
    workAddress: "",
    netWorth: "",
    salaryRange: "",
    bankName: "",
    accountNumber: "",
    workStreet: "",
    workAptNumber: "",
    workCity: "",
    workState: "",
    workZipCode: "",
  });

  const updateProfileInfo = (info: Partial<ProfileInfo>) => {
    setProfileInfo((prev) => ({ ...prev, ...info }));
  };

  return (
    <ProfileContext.Provider value={{ profileInfo, updateProfileInfo }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
