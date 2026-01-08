import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, _, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const userId = await context.getUser()._id;
        const transaction = await Transaction.find({ userId });

        return transaction;
      } catch (error) {
        console.error("Error getting transactions:", error);
        throw new Error("Error getting transactions");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (error) {
        console.error("Error getting transaction");
        throw new Error("Error getting transaction");
      }
    },
  },

  Mutation: {
    createTransaction: async (parent, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error creating a transactin:", error);
        throw new Error("Error creating a transaction");
      }
    },
    updateTransaction: async (parent, args, context) => {
      try {
        const updateTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updateTransaction;
      } catch (error) {
        console.error("Error updating transactions", error);
        throw new Error("Error updating transactions");
      }
    },
    deleteTransaction: async (parent, args, context) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deletedTransaction;
      } catch (error) {
        console.error("Error deleting transaction:", error);
        throw new Error("Error deleting transaction");
      }
    },
  },
};

export default transactionResolver;
