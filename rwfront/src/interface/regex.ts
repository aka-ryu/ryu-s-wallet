export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const codeRegex = /^\d{6}$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
export const privateKeyRegex = /^(0x)?[a-fA-F0-9]{64}$/;
export const mnemonicRegex = /^(\w+)(\s\w+){11,23}$/;
