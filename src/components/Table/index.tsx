import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Dropdown } from '../Dropdown';
import { faAngleDoubleRight, faAngleDoubleLeft, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import {
    TableWrapper,
    TableHead,
    TableBody,
    TableTR,
    TableTH,
    TableTD,
    Pagination,
    PaginationLeftSide,
    PaginationRightSide,
    PaginationLeftSideLabel,
    PaginationRightSideCounter,
    PaginationRightSideDirection
} from './styles';

// type TableProps = {
//     headers: string[];
//     data: any[];
//     columnWidths: number[];
//     pageIndex: number;
//     pageSize: number;
// }

const data = [{
    id: "146b8632-ab20-479c-a67d-3cd9f50231e8",
    title: "in hac habitasse platea dictumst maecenas ut massa quis augue",
    publishDate: "2020-09-28T15:59:05Z",
    author: {
        "name": "Bunnie Mathey",
        "avatar": "https://robohash.org/quamnonet.jpg?size=50x50&set=set1"
    },
    summary: "Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.",
    categories: [
        {
            "id": "5ee1187a-26f3-4819-b710-ccd99efc94df",
            "name": "Surveys and Forms"
        },
        {
            "id": "dc431d44-e26e-4bec-a2bd-a8ba1cd8b95d",
            "name": "Digital Marketing"
        },
        {
            "id": "0756ceeb-48d1-495a-9e47-8bdbc4a231d4",
            "name": "Platform News and Updates"
        },
        {
            "id": "b4f70697-928c-4838-8f34-3bf0fc101792",
            "name": "Tips and Best Practise"
        }
    ]
}];

export const Table: React.FC = () => {
    return (
        <TableWrapper>
            <TableHead>
                <table>
                    <thead>
                        <tr>
                            <TableTH width={3}> STT</TableTH>
                            <TableTH width={10}> Avatar</TableTH>
                            <TableTH width={10}> Name</TableTH>
                            <TableTH width={20}> Title</TableTH>
                            <TableTH width={30}> Summary</TableTH>
                            <TableTH width={20}> Categories</TableTH>
                            <TableTH width={7}> Publish Date</TableTH>
                        </tr>
                    </thead>
                </table>
            </TableHead>
            <TableBody>
                <table>
                    <tbody>
                        {data.map((post, index) => {
                            return (
                                <TableTR>
                                    <TableTD width={3}>{index + 1}</TableTD>
                                    <TableTD width={10}><img src={post.author.avatar} alt="avatar" width={50} height={50}/></TableTD>
                                    <TableTD width={10}>{post.author.name}</TableTD>
                                    <TableTD width={20}>{post.title}</TableTD>
                                    <TableTD width={30}>{post.summary}</TableTD>
                                    <TableTD width={20}>
                                        <ul>
                                        {post.categories.map(cate => (
                                            <li>{cate.name}</li>
                                        ))}
                                        </ul>
                                    </TableTD>
                                    <TableTD width={7}>{new Date(post.publishDate)}</TableTD>
                                </TableTR>
                            )
                        })}

                       
                    </tbody>
                </table>
                <Pagination>
                    <PaginationLeftSide>
                        <PaginationLeftSideLabel>Row per page</PaginationLeftSideLabel>
                        <Dropdown formLabel="" action="" onChange={(e) => {
                            e.preventDefault();
                        }}></Dropdown>
                    </PaginationLeftSide>
                    <PaginationRightSide>
                        <PaginationRightSideCounter>1- 4 of 100</PaginationRightSideCounter>
                        <PaginationRightSideDirection>
                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                        </PaginationRightSideDirection>
                        <PaginationRightSideDirection>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </PaginationRightSideDirection>
                        <PaginationRightSideDirection>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </PaginationRightSideDirection>
                        <PaginationRightSideDirection>
                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </PaginationRightSideDirection>
                    </PaginationRightSide>
                </Pagination>
            </TableBody>
        </TableWrapper>
    )
}


