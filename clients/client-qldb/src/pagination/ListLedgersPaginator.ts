// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import { ListLedgersCommand, ListLedgersCommandInput, ListLedgersCommandOutput } from "../commands/ListLedgersCommand";
import { QLDBClient } from "../QLDBClient";
import { QLDBPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: QLDBClient,
  input: ListLedgersCommandInput,
  ...args: any
): Promise<ListLedgersCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListLedgersCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListLedgers(
  config: QLDBPaginationConfiguration,
  input: ListLedgersCommandInput,
  ...additionalArguments: any
): Paginator<ListLedgersCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListLedgersCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof QLDBClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected QLDB | QLDBClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
