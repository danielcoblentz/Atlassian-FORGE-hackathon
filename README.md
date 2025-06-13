# 🧾 JiraExpense

## What is Atlassian FORGE Quest?

This project was created for the **Atlassian Forge Hackathon: Bonus Level**, where developers were challenged to build apps that extend Jira or Confluence using Atlassian’s Forge platform. I chose the Apprentice path and created an Issue Panel app inside Jira that helps track expenses related to projects or tasks.


## Overview

**JiraExpense** is a lightweight expense tracker that runs right inside a Jira issue panel. It’s designed for quick, in-context logging of project-related costs like subscriptions, travel, or supplies — no switching tabs or using spreadsheets.

![JiraExpense UI](/forge_apprentice_lvl.png)

You can:
- Add new expenses (name, amount)
- View a list of your entries
- See a running total right inside Jira


## Technologies Used

- **JavaScript** — using Forge’s JSX-style syntax
- **Atlassian Forge** — for app hosting and platform integration
- **Forge UI Kit** — for building the interface
- **Forge Storage API** — to store user expense data
- **Forge `invoke()` & resolver** — to handle backend logic
- **Jira** — runs as an Issue Panel app


## How to Install & Use

### Prerequisites
- Atlassian Forge CLI installed  
  → [Get started with Forge](https://developer.atlassian.com/platform/forge/getting-started/)

### Local Setup

1. **Clone this repo:**
   ```bash
   git clone https://github.com/your-username/jira-expense.git
   cd jira-expense
