import { Link, useHistory } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTrainerLeave } from "../../actions/trainerLeaveActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { adminConformLeaveActions } from "../../actions/adminConformLeaveActions";
import './adminLeaveApproval.css'
import * as moment from 'moment';

export default function AdminConformLeaveListReport() {
	const dispatch = useDispatch();

    useEffect(()=>{
		dispatch(adminConformLeaveActions());
	},[dispatch])

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const  ConformLeaveList = useSelector((state) => state.ConformLeaveList);
	const { loading, trainerLeave, error } = ConformLeaveList ;

	const ConformLeaveUpdate = useSelector((state) => state.ConformLeaveUpdate);
	const { success: successUpdate} = ConformLeaveUpdate;

	
	const [search, setSearch] = useState("");
	let inputHandler = (e) => {
		var lowerCase = e.target.value.toLowerCase();
		setSearch(lowerCase);
	};

	
	const history = useHistory();
	useEffect(() => {
		dispatch(listTrainerLeave());
	}, [dispatch, history, adminInfo, successUpdate]);
	if (adminInfo) {
		return (
			<div style={{ minHeight: 700 }} className="AdminLeaveReportbg">
				<br></br>
				<MainScreen title="Admin Conform Leave List">
					<div className="search" style={{ marginTop: 5 }}>
						<Form inline>
							<input
								type="text"
								placeholder="Search..."
								onChange={inputHandler}
								style={{
									width: 260,
									height: 40,
									borderRadius: 50,
									padding: "10px",
									paddingLeft: "15px",
									marginLeft: 900,
								}}
							/>
						</Form>
					</div>
					<br></br>
					<br></br>
					<div>
						<Row>
							<Col>
								<Link to="/AdminConformLeave">
									<Button variant="success" style={{ marginBottom: 6, float: "left", fontSize: 15 }} size="lg">
										Back to Leave List Page
									</Button>
								</Link>
							</Col>
							
						</Row>
					</div>

					<br />
					
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					<Table style={{ background: "white" }}>
						<>
                        <thead>
								<tr
									style={{
										boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
										height: 60,
									}}
								>
									<th
										style={{
											width: 30,
											fontSize: 20,
										}}
									>
										 FullName
									</th>
									<th
										style={{
											width: 50,
											fontSize: 20,
										}}
									>
										NIC
									</th>
									<th
										style={{
											width: 50,
											fontSize: 20,
										}}
									>
										Division
									</th>
									<th
										style={{
											width: 10,
											fontSize: 20,
										}}
									>
										Number of days Leave Apply
									</th>

                                    <th
										style={{
											width: 10,
											fontSize: 20,
										}}
									>
										Date for commencing leave
									</th>

                                    <th
										style={{
											width: 10,
											fontSize: 20,
										}}
									>
										Date for resuming duties
									</th>

                                    <th
										style={{
											width: 10,
											fontSize: 20,
										}}
									>
										Reasons for leave 
									</th>

									<th
										style={{
											width: 145,
											fontSize: 20,
										}}
									>
									 Approved Date
									</th>
                                    
                                    <th
										style={{
											width: 10,
											fontSize: 20,
										}}
									>
										Status
									</th>
								</tr>
							</thead>
							<tbody>
								{trainerLeave
									?.reverse()
									.filter((filteredB) => filteredB.nic.includes(search))
									.map((trainerLeaveList) => (
										<tr
											key={trainerLeaveList._id}
											style={{
												boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
											}}
										>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{trainerLeaveList.fullName}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{trainerLeaveList.nic}
											</td>
											<td
												style={{
													fontSize: 20,
												}}
											>
												{trainerLeaveList.division}
											</td>
                                            <td
												style={{
													fontSize: 20,
												}}
											>
												{trainerLeaveList.number_of_days}
											</td>
                                            <td
												style={{
													fontSize: 20,
												}}
											>
												{trainerLeaveList.date_for_commencing_leave}
											</td>
                                            <td
												style={{
													fontSize: 20,
												}}
											>
												{trainerLeaveList.date_for_resuming_duties}
											</td>
                                            <td
												style={{
													fontSize: 20,
												}}
											>
												{trainerLeaveList.reasons_for_leave}
											</td>
											<td
												style={{
													fontSize: 20,
													
												}}
											>
												{moment(trainerLeaveList.updatedAt).format("DD-MMM-YYYY  LT")}
											</td>
                                            <td
												style={{
													fontSize: 20,
												}}
											>
												{trainerLeaveList.approved}
											</td>
                                           
											
										</tr>
									))}
							</tbody>
						</>
					</Table>
					<br></br>
				</MainScreen>
			</div>
		);
	} else {
		return (
			<div className="denied">
				<MainScreen />
				<br></br>
			</div>
		);
	}
}




