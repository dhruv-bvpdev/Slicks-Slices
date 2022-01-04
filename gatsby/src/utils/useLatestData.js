import { useState, useEffect } from "react";

const gql = String.raw;

function useLatestData() {
  const [hotSlices, setHotSlices] = useState();
  const [sliceMasters, setSliceMasters] = useState();
  //use a side effect to fetch data from graphql
  useEffect(function () {
    //when component loads fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
              hotslices {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    }).then((res) =>
      res.json().then((res) => {
        //set the data to state
        setHotSlices(res.data.StoreSettings.hotslices);
        setSliceMasters(res.data.StoreSettings.slicemaster);
      })
    );
  }, []);

  return {
    hotSlices,
    sliceMasters,
  };
}

export default useLatestData;
