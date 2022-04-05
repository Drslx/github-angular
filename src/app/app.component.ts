import { Component } from '@angular/core';

// Interface Users
export interface User {
  login: string;
  name: string;
  followers?: number;
  following?: number;
  public_repos: string;
  avatar_url: string;
  blog?: string;
  bio?: string;
  company?: string;
  /*  email?: string; */
  location: string;
  html_url: string;
  repos_url: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users: User[] = [];
  search__user = '';
  btnSearch = 'Search';

  // Metodo para consumir api
  async getUser(user: string): Promise<User> {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();

    if (data.cod === '404') throw new Error(data);
    return data;
  }

  // Ouvinte para o botão de busca, que chama a função getUser que solicita a api
  handleClick(): void {
    this.getUser(this.search__user).then((data) => {
      this.users.push(data);
    });
  }

  // Ouvinte de evento
  handleSearchChange(event: any) {
    this.search__user = event.target.value;
  }
}
