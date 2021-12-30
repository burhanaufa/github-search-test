import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";

import Logo from "../img/github-logo.png";
import { SELECT_TYPE } from "../constants";
import Pagination from "react-paginate";

import { fetchDataRepos, fetchDataUsers } from "../redux/api";
import {
	Container,
	WrapperHeader,
	ImageWrapper,
	ImageBodyWrapper,
	TextWrapper,
	InputWrapper,
	BodyWrapper,
	CustomInput,
	CustomSelect,
	CardWhite,
} from "./styled";

const Index = () => {
	const [user, setUser] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(9);
	const [category, setCategory] = useState("users");
	const repos = useSelector((state) => state?.repos);
	const { loading, dataRepos, dataUser, error } = repos;

	const dispatch = useDispatch();

	const queryParams = {
		q: user,
		page: currentPage,
		per_page: postsPerPage,
	};

	useEffect(() => {
		if (category === "users") {
			dispatch(fetchDataUsers(queryParams));
		} else if (category === "repositories") {
			dispatch(fetchDataRepos(queryParams));
		}
	}, [user, dispatch, category, currentPage]);

	const onChangeCategory = (e) => {
		setCategory(e.target.value);
	};

	const handleClick = ({ selected }) => {
		setCurrentPage(selected + 1);
	};

	const renderBody = () => {
		if (category === "users") {
			return (
				<>
					{loading ? (
						<h1>Loading...</h1>
					) : error ? (
						<h1 style={{ color: "red" }}>{error?.message}</h1>
					) : (
						<>
							{dataUser?.items?.map((item) => (
								<CardWhite>
									<ImageBodyWrapper
										src={item.avatar_url}
										key={item.avatar_url}
									/>
									<TextWrapper>User Name : {item.login}</TextWrapper>
									<TextWrapper>
										<a href={item.html_url} target="_blank" rel="noreferrer">
											{item.html_url}
										</a>
									</TextWrapper>
								</CardWhite>
							))}
						</>
					)}
				</>
			);
		} else if (category === "repositories") {
			return (
				<>
					{loading ? (
						<h1>Loading...</h1>
					) : error ? (
						<h1 style={{ color: "red" }}>{error?.message}</h1>
					) : (
						<>
							{dataRepos?.items?.map((item) => (
								<CardWhite>
									<TextWrapper>Repository Name : {item.name}</TextWrapper>
									<TextWrapper>Author : {item.owner.login}</TextWrapper>
									<TextWrapper>Language : {item.language}</TextWrapper>
									<TextWrapper>Stars : {item.stargazers_count}</TextWrapper>
									<TextWrapper>Forks : {item.forks_count}</TextWrapper>
									<TextWrapper>
										<a href={item.html_url} target="_blank" rel="noreferrer">
											{item.html_url}
										</a>
									</TextWrapper>
								</CardWhite>
							))}
						</>
					)}
				</>
			);
		}
	};
	return (
		<Container>
			<WrapperHeader>
				<ImageWrapper src={Logo} />
				<TextWrapper>
					<span style={{ fontSize: "16px", color: "black" }}>
						<b>Github Searcher</b>
					</span>{" "}
					<span style={{ fontSize: "12px", color: "grey" }}>
						Search users or repositories below
					</span>
				</TextWrapper>
			</WrapperHeader>
			<InputWrapper>
				<CustomInput
					placeholder="Typing to search users or repositories .."
					value={user}
					onChange={(e) => setUser(e.target?.value)}
				/>
				<CustomSelect onChange={onChangeCategory}>
					{SELECT_TYPE.map((item) => (
						<option key={item.value} value={item.value}>
							{item.text}
						</option>
					))}
				</CustomSelect>
			</InputWrapper>
			<BodyWrapper>{renderBody()}</BodyWrapper>
			<div className="App">
				{category === "users" && dataUser && (
					<Pagination
						previousLabel={"Previous"}
						nextLabel={"Next"}
						pageCount={dataUser?.total_count}
						onPageChange={handleClick}
						containerClassName={"paginationBttns"}
						previousLinkClassName={"previousBttn"}
						nextLinkClassName={"nextBttn"}
						disabledClassName={"paginationDisabled"}
						activeClassName={"paginationActive"}
					/>
				)}
				{category === "repositories" && dataRepos && (
					<Pagination
						previousLabel={"Previous"}
						nextLabel={"Next"}
						pageCount={dataRepos?.total_count}
						onPageChange={handleClick}
						containerClassName={"paginationBttns"}
						previousLinkClassName={"previousBttn"}
						nextLinkClassName={"nextBttn"}
						disabledClassName={"paginationDisabled"}
						activeClassName={"paginationActive"}
					/>
				)}
			</div>
		</Container>
	);
};

export default Index;
