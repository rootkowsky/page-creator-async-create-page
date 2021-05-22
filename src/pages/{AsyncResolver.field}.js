import React from "react";
import {graphql} from "gatsby";

const View = (props) => {
    /**
     * Error!
     * `props.data` is `undefined`
     * Make `resolver` sync to fix it
     */
    return <div>
        {props.data.asyncResolver.field}
    </div>
}

export default View;

export const query = graphql`
    query ViewQuery($id: String!) {
        asyncResolver(id: {eq: $id}) {
            field
        }
    }
`;
