export const createAuthSlice = (set) => ({
  session: null,
  resetPasswordSession: null,
  appIsReady: false,
  passwordResetEmail: '',
  userMetaData: {
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    birthday: new Date(),
    phone: 0,
    barangay: '',
    street: '',
    houseNumber: '',
    email: '',
  },
  setPasswordResetEmail: (value) => set({ passwordResetEmail: value }),
  setSession: (encryptedSession) => {
    set({ session: encryptedSession })
  },
  removeSession: () => {
    set({ session: null })
  },
  setAppIsReady: (value) => set({ appIsReady: value }),
  setResetPasswordSession: (value) => set({ resetPasswordSession: value }),
  removePasswordResetSession: () => {
    set({ resetPasswordSession: null })
  },
  setUserMetaData: (value) => set({ userMetaData: value }),
})
