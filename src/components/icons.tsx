export function Icon({ path }: { path: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

export const LOCK_ICON =
  "M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zM8 11V7a4 4 0 0 1 8 0v4";
export const BAG_ICON =
  "M5 3h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM8 8a4 4 0 0 0 8 0";
export const TRUCK_ICON =
  "M2 6h12v11H2zM14 10h4l4 4v3h-8zM7 19.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 19.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z";
export const MENU_ICON = "M4 7h16M4 12h16M4 17h16";
export const CLOSE_ICON = "M6 6l12 12M18 6L6 18";
