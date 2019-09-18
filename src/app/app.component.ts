import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tic-Tac-Toe';
  user: 'X' | 'O' = 'X';
  squares: any[];
  won = false;
  move(index) {
    if ((this.squares[index] === null || this.squares[index] === '') && !this.won) {
      console.log(this.won);
      this.squares[index] = this.user;
      this.user === 'X' ? this.user = 'O' : this.user = 'X';
      this.checkWinner();
    }
  }
  checkWinner() {
    localStorage.setItem('gameState', this.squares.toString());
    localStorage.setItem('user', this.user);
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if ( this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        this.won = true;
        localStorage.setItem('gameWon', 'true');
        this.user === 'X' ? this.user = 'O' : this.user = 'X';
        return;
      }
    }
  }
  ngOnInit(): void {
    this.loadState();
  }
  loadState() {
    this.squares = localStorage.getItem('gameState').split(',');
    this.won = JSON.parse(localStorage.getItem('gameWon'));
    // @ts-ignore
    this.user = localStorage.getItem('user');
    // console.log(this.squares);
  }
  startNew() {
    this.squares = Array(9).fill(null);
    localStorage.setItem('gameWon', 'false');
    this.won = false;
  }
}
