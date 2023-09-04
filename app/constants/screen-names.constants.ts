export type ScreenTypes = {
  HOME: string;
  UPLOAD: string;
  LOGIN: string;
};
export const ScreenNames: ScreenTypes = {
  HOME: 'Home',
  UPLOAD: 'Upload',
  LOGIN: 'Login',
};

export const screenOption: any = {
  //animationEnabled: false,
  //animation: 'slide_from_right',
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  contentStyle: {
    backgroundColor: '#fff',
  },
};
