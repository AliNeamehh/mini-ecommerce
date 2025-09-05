import React from "react";
import { Product } from "../lib/types";
import { useCart } from "../store/cart";
import { isAuthed } from "../lib/auth";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const router = useRouter();
  const out = (product.stockQuantity ?? 0) <= 0;
  const oldPrice = (product as any).oldPrice ?? (product as any).compareAtPrice;

  return (
    <article
      className="  h-full
        w-full max-w-[320px]
        bg-white rounded-2xl shadow-md hover:shadow-lg
        transition-all overflow-hidden
        flex flex-col
      "
    >
      {/* Image panel */}
      <div className="relative bg-[#0f1b2d] aspect-[4/3] grid place-items-center">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-[85%] h-[85%] object-contain"
          />
        ) : (
          <div className="text-white/60 text-sm">No image</div>
        )}

        {/* Stock badge */}
        <span
          className={`absolute left-3 top-3 px-2.5 py-1 rounded-full text-[11px] font-semibold
          ${out ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}
        >
          {out ? "Out of Stock" : "In Stock"}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col">
        <h3 className="text-sm font-semibold text-slate-900 leading-snug">
          {product.name}
        </h3>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          {oldPrice ? (
            <span className="text-xs text-slate-400 line-through">
              ${Number(oldPrice).toFixed(2)}
            </span>
          ) : null}
        </div>

        {product.description ? (
          <p className="mt-1 text-xs text-slate-500">
            {product.description.slice(0, 70)}
            {product.description.length > 70 ? "…" : ""}
          </p>
        ) : null}

        <button
          onClick={() => {
            if (!isAuthed()) {
              router.push("/login");
              return;
            }
            add(product);
          }}
          disabled={out}
          data-testid={`add-to-cart-${product.id}`}
          className={`mt-3 h-11 w-full rounded-full font-bold transition-colors
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${out ? "bg-slate-300 text-white cursor-not-allowed"
                  : "bg-[#0f1b2d] text-white hover:bg-[#0c1523]"}`}
        >
          {out ? "OUT OF STOCK" : "ADD TO CART"}
        </button>
      </div>
    </article>
  );
}
