import { Grid, Typography } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import AddressCard from "./AddressCard";
import { IAddress } from "./Interface/IUser";

interface Props {
  address?: IAddress[];
  page?: string;
  selectedAddress?: string;
  title: string;
}

const AddressBook: React.FC<Props> = ({
  address,
  page,
  selectedAddress,
  title,
}: Props) => {
  const [addressList, setAddressList] = useState<IAddress[] | undefined>(
    address
  );

  const sortAddressByPrimary = useCallback(() => {
    const primaryAddress: IAddress[] | undefined = address?.filter(
      (addr) => addr.isPrimary === "1"
    );

    const addressMap: IAddress[] | undefined = address?.filter(
      (addr) => addr.isPrimary !== "1"
    );
    if (addressMap && primaryAddress) {
      addressMap.unshift(primaryAddress[0]);
      setAddressList(addressMap);
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      sortAddressByPrimary();
    }
  }, [address, sortAddressByPrimary]);

  return (
    <>
      <Grid container spacing={4} style={{ marginBottom: 10 }}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h4" component="h4">
            {title}
          </Typography>
        </Grid>
        {addressList?.map((addr, index) => (
          <Grid key={index} item lg={4} md={6} sm={6} xs={12}>
            <AddressCard
              address={addr}
              page={page}
              selected={selectedAddress === addr._id ? true : false}
            />
          </Grid>
        ))}
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <AddressCard />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressBook;
