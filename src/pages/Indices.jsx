/*
 * Copyright (c) 2021-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOktaAuth } from "@okta/okta-react";
import React, { useState, useEffect } from "react";
import { Header, Icon, Message, Table } from "semantic-ui-react";

import config from "../config";

const Indices = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [indices, setIndices] = useState(null);
  const [indicesFetchFailed, setMessageFetchFailed] = useState(false);

  // fetch indices
  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const accessToken = oktaAuth.getAccessToken();
      fetch(config.resourceServer.indicesUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return Promise.reject();
          }
          return response.json();
        })
        .then((data) => {
          let index = 0;
          const formattedIndices = data.data.map((indexEntry) => {
            index += 1;
            return {
              text: indexEntry.title,
            };
          });
          setIndices(formattedIndices);
          setMessageFetchFailed(false);
        })
        .catch((err) => {
          setMessageFetchFailed(true);
          /* eslint-disable no-console */
          console.error(err);
        });
    }
  }, [authState, oktaAuth]);

  const possibleErrors = [
    "You've downloaded one of our resource server examples, and it's running on port 8000.",
    "Your resource server example is using the same Okta authorization server (issuer) that you have configured this React application to use.",
  ];

  return (
    <div>
      <Header as="h1">
        <Icon name="mail outline" />
        Indices
      </Header>
      {indicesFetchFailed && (
        <Message
          error
          header="Failed to fetch indices.  Please verify the following:"
          list={possibleErrors}
        />
      )}
      {!indices && !indicesFetchFailed && <p>Fetching Indices...</p>}
      {indices && (
        <div>
          <p>
            This component makes a GET request to the resource server example,
            which must be running at <br/>
            <code>
              http://localhost:5198/service/api/IndexOverview/GetIndexes
            </code>
          </p>
          <p>
            It attaches your current access token in the{" "}
            <code>Authorization</code> header on the request, and the resource
            server will attempt to authenticate this access token. If the token
            is valid the server will return a list of indices. If the token is
            not valid or the resource server is incorrectly configured, you will
            see a 401 <code>Unauthorized response</code>.
          </p>
          <p>
            This route is protected with the <code>&lt;SecureRoute&gt;</code>{" "}
            component, which will ensure that this page cannot be accessed until
            you have authenticated and have an access token in local storage.
          </p>
          <Table>
            <thead>
              <tr>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {indices.map((indexEntry) => (
                <tr>
                  <td>{indexEntry.text}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Indices;
