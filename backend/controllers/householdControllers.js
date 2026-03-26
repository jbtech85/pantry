import poolQuery from "../db/connection";


export const getDefaultHousehold = async (req, res) => {
  const { account_id } = req.params;

  const { data, status } = await poolQuery({
    text: 'SELECT household_fk FROM account_household WHERE account_id = $1',
    values: [account_id]
  });


}


// for deleteHousehold, be sure to do something like
// UPDATE account SET default_household_fk = NULL WHERE default_household_fk = ${deleted_household_id}
