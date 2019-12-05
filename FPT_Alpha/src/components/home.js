import React, { Component } from "react";
import Header from "./commom/header";
import Row from "./board/row";
import Countdown from "react-countdown-now";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbercell: null,
      show: false,
      isLogin: false
    };
  }

  checkLogin(usernameA, passwordA, usernameB, passwordB) {
    if (
      usernameA == "khoilq" &&
      passwordA == "123456" &&
      usernameB == "phongnc" &&
      passwordB == "123456"
    ) {
      return true;
    }
    return false;
  }

  render() {
    const {
      setNumberCell,
      array_board,
      tick,
      piece_current,
      is_win,
      pieces_win,
      reset_map
    } = this.props;
    var usernameA = null,
      passwordA = null,
      eloA = null,
      isLogA = false,
      usernameB = null,
      passwordB = null,
      eloB = null,
      isLogB = false;
    return (
      <div>
        <div className="container">
          <Header />
          {this.state.isLogin == false ? (
            <form
              onSubmit={event => {
                event.preventDefault();
                usernameA = this.usernameA.value;
                passwordA = this.passwordA.value;
                usernameB = this.usernameB.value;
                passwordB = this.passwordB.value;
                if (
                  this.checkLogin(usernameA, passwordA, usernameB, passwordB) ==
                  true
                ) {
                  eloA = 168;
                  eloB = 173;
                  console.log("login ok");
                  this.setState({ isLogin: true });
                  // window.location.reload();
                } else {
                  alert("Username or Password is incorrect");
                }
                // console.log("Login: ", usernameA, ":", passwordA);
              }}
            >
              <p>Đăng nhập người chơi X</p>
              <div className="form-group mr-sm-2">
                <input
                  id="usernameA"
                  type="text"
                  ref={input => {
                    this.usernameA = input;
                  }}
                  className="form-control"
                  placeholder="Tên đăng nhập"
                  required
                />
              </div>
              <div className="form-group mr-sm-2">
                <input
                  id="passwordA"
                  type="password"
                  ref={input => {
                    this.passwordA = input;
                  }}
                  className="form-control"
                  placeholder="Mật khẩu"
                  required
                />
              </div>

              <p>Đăng nhập người chơi O</p>
              <div className="form-group mr-sm-2">
                <input
                  id="usernameB"
                  type="text"
                  ref={input => {
                    this.usernameB = input;
                  }}
                  className="form-control"
                  placeholder="Tên đăng nhập"
                  required
                />
              </div>
              <div className="form-group mr-sm-2">
                <input
                  id="passwordB"
                  type="password"
                  ref={input => {
                    this.passwordB = input;
                  }}
                  className="form-control"
                  placeholder="Mật khẩu"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          ) : array_board == null ? (
            <div className="input-custom">
              <input
                type="number"
                placeholder="Độ khó"
                min="5"
                max="100"
                required
                onChange={event => {
                  this.setState({ numbercell: event.target.value });
                }}
                onKeyPress={event => {
                  if (event.key == "Enter") {
                    if (
                      this.state.numbercell == null ||
                      (!Number.isInteger(this.state.numbercell) &&
                        (parseInt(this.state.numbercell) < 5 ||
                          parseInt(this.state.numbercell) > 100))
                    ) {
                      alert("Vui lòng chọn độ khó trong khoảng 5 - 100");
                      return;
                    }
                    setNumberCell(this.state.numbercell);
                  }
                }}
              />
            </div>
          ) : (
            <div className="row board">
              <div className="col-md-10">
                {array_board.map((e, index) => (
                  <div>
                    <Row
                      elements={e}
                      tick={(row, col) => tick(row, col)}
                      row={index}
                      pieces_win={pieces_win}
                    />
                  </div>
                ))}
              </div>
              <div className="col-md-2 information">
                <p className="title">THÔNG TIN</p>
                <p>
                  Còn lại: <Countdown date={Date.now() + 10000} />
                </p>
                <p>Đến lượt: {piece_current}</p>

                <p>
                  {" "}
                  Trạng thái :{" "}
                  {is_win == 1 ? (
                    <span>{piece_current} thắng</span>
                  ) : is_win == 0 ? (
                    <span>Hoà</span>
                  ) : (
                    <span>Đang chơi</span>
                  )}
                </p>
                <b>Người chơi X</b>
                <p>Tên đăng nhập: </p>
                <p>Elo: </p>
                <b>Người chơi O</b>
                <p>Tên đăng nhập: </p>
                <p>Elo: </p>

                <button onClick={() => reset_map()} className="btn btn-info">
                  Chơi lại
                </button>
                <button className="btn btn-info">Lưu trạng thái</button>
                <button className="btn btn-info">Khôi phục lượt chơi</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
