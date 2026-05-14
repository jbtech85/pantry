import poolQuery from "../db/connection.js";


export const getDefaultHousehold = async (req, res) => {
  const { account_id } = req.params;

  try {
    const householdInfo = await poolQuery({
      text: 'SELECT default_household_fk FROM account WHERE account_id = $1',
      values: [account_id]
    });

    let defaultHouseholdFK = 1; // 1 means no default (whereas 0 means anonymous)
    if(householdInfo.data.rows.length > 0) {
      defaultHouseholdFK = householdInfo.data.rows[0].default_household_fk;
    }

    res.status(200).json({defaultHouseholdFK});
  } catch (err) {
    res.status(400).json({error: err.message});
  }

}


// for deleteHousehold, be sure to do something like
// UPDATE account SET default_household_fk = NULL WHERE default_household_fk = ${deleted_household_id}
