// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import {
  ListMonitoringAlertHistoryCommand,
  ListMonitoringAlertHistoryCommandInput,
  ListMonitoringAlertHistoryCommandOutput,
} from "../commands/ListMonitoringAlertHistoryCommand";
import { SageMakerClient } from "../SageMakerClient";
import { SageMakerPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: SageMakerClient,
  input: ListMonitoringAlertHistoryCommandInput,
  ...args: any
): Promise<ListMonitoringAlertHistoryCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListMonitoringAlertHistoryCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListMonitoringAlertHistory(
  config: SageMakerPaginationConfiguration,
  input: ListMonitoringAlertHistoryCommandInput,
  ...additionalArguments: any
): Paginator<ListMonitoringAlertHistoryCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListMonitoringAlertHistoryCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof SageMakerClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected SageMaker | SageMakerClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
