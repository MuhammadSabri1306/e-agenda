export const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	xl2: 1536
};

export const isExtraSmall = () => window.innerWidth < breakpoints.sm;

export const isSmall = () => window.innerWidth >= breakpoints.sm && window.innerWidth < breakpoints.md;

export const isMedium = () => window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg;

export const isLarge = () => window.innerWidth >= breakpoints.lg && window.innerWidth < breakpoints.xl;

export const isExtraLarge = () => window.innerWidth >= breakpoints.xl && window.innerWidth < breakpoints.xl2;

export const isExtraLarge2 = () => window.innerWidth >= breakpoints.xl2;

export const getCurrBreakpoint = () => {
	return isExtraSmall() ? "xs"
		: isSmall() ? "sm"
		: isMedium() ? "md"
		: isLarge() ? "lg"
		: isExtraLarge() ? "xl"
		: "xl2";
};