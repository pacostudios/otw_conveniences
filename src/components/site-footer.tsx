import Link from "next/link";
import { Icon, LOCK_ICON } from "@/components/icons";
import { STORE, WHATSAPP_URL } from "@/data/store";

const LINK = "transition-colors hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950";

function Separator() {
  return <li aria-hidden="true" className="size-1 rounded-full bg-stone-300" />;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-[#faf8f5] text-stone-950">
      <div aria-hidden="true" className="h-20 border-b border-stone-200" />
      {/* Extra padding keeps the floating WhatsApp button clear of the text. */}
      <div className="mx-auto flex max-w-[1344px] flex-col gap-6 px-6 pt-10 pb-24 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:px-0 2xl:pb-10">
        <p className="font-display flex items-center gap-2.5 text-sm font-black uppercase [font-stretch:125%] sm:text-base">
          <span aria-hidden="true" className="size-2 shrink-0 rounded-[2px] bg-stone-950" />
          {STORE.name}
        </p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-wider text-stone-600 uppercase">
            {WHATSAPP_URL && (
              <>
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 font-bold text-stone-950 ${LINK}`}
                  >
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-green-500" />
                    WhatsApp Support
                  </a>
                </li>
                <Separator />
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                    Contact
                  </a>
                </li>
              </>
            )}
            <li>
              <Link href="/#products" className={LINK}>
                Shop
              </Link>
            </li>
            <Separator />
            <li>
              <Link href="/#why-us" className={LINK}>
                Discreet Delivery
              </Link>
            </li>
            <Separator />
            <li>
              <Link href="/admin" className={`flex items-center gap-1 ${LINK}`}>
                <Icon path={LOCK_ICON} />
                Admin
              </Link>
            </li>
          </ul>
        </nav>

        <p className="font-mono text-[9px] tracking-wide text-stone-500">
          © 2026 {STORE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
