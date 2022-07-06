import React, { useContext } from "react";

import Endpoint from "./Endpoint";
import Context from "../Context";
import ProductTypesContainer from "../../src/Components/ProductTypes/ProductTypesContainer";
import {
  transactionsCategories,
  authCategories,
  identityCategories,
  balanceCategories,
  investmentsCategories,
  investmentsTransactionsCategories,
  liabilitiesCategories,
  paymentCategories,
  assetsCategories,
  incomePaystubsCategories,
  transferCategories,
  transformAuthData,
  transformTransactionsData,
  transformBalanceData,
  transformInvestmentsData,
  transformInvestmentTransactionsData,
  transformLiabilitiesData,
  transformIdentityData,
  transformPaymentData,
  transformAssetsData,
  transformTransferData,
  transformIncomePaystubsData,
} from "../dataUtilities";

const BankFeed = () => {
  const { products } = useContext(Context);
  console.log(transformTransactionsData,"data trans")
  return (
    <div>
      {transformTransactionsData.length > 30 ?
        <div><h2>hello</h2></div>
        :
        <Endpoint
          endpoint="transactions"
          name="Transactions"
          categories={transactionsCategories}
          schema="/transactions/get/"
          description="Retrieve transactions for credit and depository accounts."
          transformData={transformTransactionsData}
        />}
    </div>
  );
};

BankFeed.displayName = "Products";

export default BankFeed;
