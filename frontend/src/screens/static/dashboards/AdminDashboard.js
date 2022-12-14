import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { adminLogout } from "../../../actions/adminActions";
import "./Dashboard.css";
import MainScreen from "../../../components/MainScreen";

const AdminDashboardPage = ({ history }) => {
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(adminLogout());
		history.push("/");
	};

	if (adminInfo) {
		return (
			<div className="adminBackground">
				<br></br>
				<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
					<Button
						variant="danger"
						onClick={logoutHandler}
						className="logoutBtn"
						style={{ float: "right", marginTop: 3, fontSize: 15 }}
					>
						Logout
					</Button>

					<br></br>
					<br></br>

					<div className="loginContainer">
						<Card
							style={{
								borderRadius: 45,
								borderWidth: 2.0,
								marginTop: 20,
								paddingInline: 10,
								background: "rgba(231, 238, 238, 0.8)",
								marginLeft: "10%",
								marginRight: "10%",
							}}
						>
							<div className="intro-text">
								<br></br>
								<br></br>
								<div>
									<Link to="/admin-view">
										<Button variant="success" size="lg" className="landingbutton">
											My Account
										</Button>
									</Link>
									<Link to="/admin-register">
										<Button variant="success" size="lg" className="landingbutton">
											Create New Admin Account
										</Button>
									</Link>
								</div>
								<br></br>
								<div>
									<Link to="/admin-customers">
										<Button variant="success" size="lg" className="landingbutton">
											Customer Account Management
										</Button>
									</Link>
									<Link to="/admin-trainers">
										<Button variant="success" size="lg" className="landingbutton">
											Trainer Account Management
										</Button>
									</Link>
								</div>
								<br></br>
								<div>
									<Link to="/">
										<Button variant="success" size="lg" className="landingbutton">
											Meal Plan Management
										</Button>
									</Link>
									<Link to="/">
										<Button variant="success" size="lg" className="landingbutton">
											Q & A Management
										</Button>
									</Link>
								</div>
								<br></br>
								<div>
									<Link to="/adminConformLeave">
										<Button variant="success" size="lg" className="landingbutton">
											Employee Leave Management
										</Button>
									</Link>
									<Link to="/">
										<Button variant="success" size="lg" className="landingbutton">
											Workout Management
										</Button>
									</Link>
								</div>
							</div>
							<br></br>
							<br></br>
						</Card>
					</div>
				</MainScreen>
				<br></br>
				<br></br>
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
};

export default AdminDashboardPage;
