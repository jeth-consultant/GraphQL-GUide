import { mergeResolver } from "@graphql-tools/merge";
import userRseolver from "./user.resolver";
import transactionResolver from "./transaction.resolver";

const mergeResolver = mergeResolver([userRseolver, transactionResolver]);

export default mergeResolver;
