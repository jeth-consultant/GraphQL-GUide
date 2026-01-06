import {  mergeResolvers } from "@graphql-tools/merge";
import userRseolver from "./user.resolver.js";
import transactionResolver from "./transaction.resolver.js";

const mergeResolver = mergeResolvers([userRseolver, transactionResolver]);

export default mergeResolver;
