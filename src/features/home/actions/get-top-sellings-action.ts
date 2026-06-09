"use server";

import { getMediator } from "@/lib/mediator";
import { GetTopSellingsQuery } from "@/libres.application/features/book-features/queries/get-top-sellings/get-top-sellings-query";
import { GetTopSellingsResponse } from "@/libres.application/features/book-features/queries/get-top-sellings/get-top-sellings-response";
import { Result } from "@/libres.domain/common/result";
import { unstable_cache } from "next/cache";

const getCachedTopSellingsData = unstable_cache(
  async () => {
    const mediator = getMediator();

    const getTopSellingsQuery = new GetTopSellingsQuery();

    const result: Result<GetTopSellingsResponse[]> =
      await mediator.send(getTopSellingsQuery);

    return result.toPlain();
  },
  ["top-sellings-10min"],
  {
    revalidate: 1,
  },
);

export default async function GetTopSellingsAction() {
  const result = await getCachedTopSellingsData();
  return result;
}
