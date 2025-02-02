import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";
import { perPage } from "../config";
import Pagination from "./Pagination";

const Center = styled.div`
    text-align: center;
`;
const ItemsList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    max-width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
`;

export const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
        items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;

export default class Items extends Component {
    render() {
        return (
            <div>
                <p>Items</p>
                <Pagination page={this.props.page} />
                <Query
                    query={ALL_ITEMS_QUERY}
                    fetchPolicy="network-only"
                    variables={{
                        skip: this.props.page * perPage - perPage
                    }}
                >
                    {({ data, error, loading }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        return (
                            <ItemsList>
                                {data.items.map((item) => (
                                    <Item key={item.id} item={item} />
                                ))}
                            </ItemsList>
                        );
                    }}
                </Query>
                <Pagination />
            </div>
        );
    }
}
