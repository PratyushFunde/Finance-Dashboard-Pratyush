export const PERMISSIONS = {
  viewer: {
    canAddTransaction: false,
    canEditTransaction: false,
    canDeleteTransaction: false,
  },
  admin: {
    canAddTransaction: true,
    canEditTransaction: true,
    canDeleteTransaction: true,
  },
  editor: {
    canAddTransaction: true,
    canEditTransaction: true,
    canDeleteTransaction: false,
  },
} as const;

export const getPermissions = (role: keyof typeof PERMISSIONS) => {
  return PERMISSIONS[role];
};