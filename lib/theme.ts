'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: {
        // light: true,
        dark: true,
    },
    typography: {
        fontFamily: 'var(--cutiveMono-font)',
        // fontSize:30,
    },
});

export default theme;