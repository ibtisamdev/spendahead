#!/usr/bin/env python3
"""
Generate ER Diagram for SpendAhead Database

This script generates a dbdiagram.io compatible schema from the SQLAlchemy models.
Run this script and copy the output to https://dbdiagram.io/d to visualize the ER diagram.
"""

import os
import sys
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from app.models import (
    User,
    Category,
    Transaction,
    Account,
    Budget,
    BudgetItem,
    AIInsight,
    AuditLog,
)


def generate_dbdiagram_schema():
    """Generate dbdiagram.io compatible schema."""

    schema = """// SpendAhead Database Schema
// Generated from SQLAlchemy models
// Copy this to https://dbdiagram.io/d to visualize

// Users table - Core user management
Table users {
  id uuid [pk]
  email varchar(255) [unique, not null]
  hashed_password varchar(255) [not null]
  is_active boolean [default: true, not null]
  is_verified boolean [default: false, not null]
  is_superuser boolean [default: false, not null]
  first_name varchar(100)
  last_name varchar(100)
  phone varchar(20)
  timezone varchar(50) [default: 'UTC', not null]
  currency varchar(3) [default: 'USD', not null]
  language varchar(5) [default: 'en', not null]
  notification_preferences text
  theme_preference varchar(20) [default: 'light', not null]
  created_at timestamp [not null]
  updated_at timestamp [not null]
  last_login_at timestamp
  is_deleted boolean [default: false, not null]
  deleted_at timestamp
}

// Categories table - Transaction categorization
Table categories {
  id uuid [pk]
  user_id uuid [ref: > users.id, not null]
  parent_id uuid [ref: > categories.id]
  name varchar(100) [not null]
  description text
  color varchar(7) [default: '#3B82F6', not null]
  icon varchar(50)
  category_type varchar(20) [default: 'expense', not null]
  budget_amount decimal(10,2)
  budget_period varchar(20) [default: 'monthly', not null]
  transaction_count integer [default: 0, not null]
  total_amount decimal(10,2) [default: 0.00, not null]
  ai_confidence_score decimal(3,2)
  keywords text
  is_system boolean [default: false, not null]
  is_active boolean [default: true, not null]
  created_at timestamp [not null]
  updated_at timestamp [not null]
  is_deleted boolean [default: false, not null]
  deleted_at timestamp
}

// Accounts table - Financial accounts
Table accounts {
  id uuid [pk]
  user_id uuid [ref: > users.id, not null]
  name varchar(100) [not null]
  description text
  account_type varchar(50) [not null]
  account_subtype varchar(50)
  currency varchar(3) [default: 'USD', not null]
  current_balance decimal(10,2) [default: 0.00, not null]
  available_balance decimal(10,2)
  credit_limit decimal(10,2)
  account_number varchar(50)
  routing_number varchar(20)
  institution_name varchar(100)
  institution_id varchar(50)
  external_id varchar(255)
  external_account_id varchar(255)
  last_sync_at timestamp
  sync_status varchar(20) [default: 'manual', not null]
  is_active boolean [default: true, not null]
  is_archived boolean [default: false, not null]
  exclude_from_budget boolean [default: false, not null]
  exclude_from_net_worth boolean [default: false, not null]
  color varchar(7) [default: '#3B82F6', not null]
  icon varchar(50)
  display_order integer [default: 0, not null]
  account_metadata jsonb
  created_at timestamp [not null]
  updated_at timestamp [not null]
  is_deleted boolean [default: false, not null]
  deleted_at timestamp
}

// Transactions table - Core financial transactions
Table transactions {
  id uuid [pk]
  user_id uuid [ref: > users.id, not null]
  from_account_id uuid [ref: > accounts.id]
  to_account_id uuid [ref: > accounts.id]
  category_id uuid [ref: > categories.id]
  description varchar(255) [not null]
  amount decimal(10,2) [not null]
  currency varchar(3) [default: 'USD', not null]
  transaction_type varchar(20) [not null]
  transaction_date timestamp [not null]
  notes text
  tags jsonb
  location varchar(255)
  is_recurring boolean [default: false, not null]
  recurring_pattern jsonb
  parent_transaction_id uuid [ref: > transactions.id]
  external_id varchar(255)
  import_source varchar(50)
  import_metadata jsonb
  ai_categorized boolean [default: false, not null]
  ai_confidence_score decimal(3,2)
  ai_suggested_category_id uuid [ref: > categories.id]
  ai_categorization_data jsonb
  is_verified boolean [default: false, not null]
  is_cleared boolean [default: false, not null]
  is_reconciled boolean [default: false, not null]
  created_at timestamp [not null]
  updated_at timestamp [not null]
  is_deleted boolean [default: false, not null]
  deleted_at timestamp
}

// Budgets table - Budget management
Table budgets {
  id uuid [pk]
  user_id uuid [ref: > users.id, not null]
  name varchar(100) [not null]
  description text
  period_type varchar(20) [default: 'monthly', not null]
  start_date timestamp [not null]
  end_date timestamp [not null]
  total_budget decimal(10,2) [not null]
  currency varchar(3) [default: 'USD', not null]
  is_active boolean [default: true, not null]
  is_template boolean [default: false, not null]
  rollover_enabled boolean [default: false, not null]
  alert_threshold integer [default: 80, not null]
  alert_enabled boolean [default: true, not null]
  ai_generated boolean [default: false, not null]
  ai_suggestions jsonb
  actual_spent decimal(10,2) [default: 0.00, not null]
  variance_amount decimal(10,2) [default: 0.00, not null]
  variance_percentage decimal(5,2) [default: 0.00, not null]
  created_at timestamp [not null]
  updated_at timestamp [not null]
  is_deleted boolean [default: false, not null]
  deleted_at timestamp
}

// Budget Items table - Individual budget categories
Table budget_items {
  id uuid [pk]
  budget_id uuid [ref: > budgets.id, not null]
  category_id uuid [ref: > categories.id, not null]
  planned_amount decimal(10,2) [not null]
  actual_amount decimal(10,2) [default: 0.00, not null]
  is_fixed boolean [default: false, not null]
  priority integer [default: 1, not null]
  variance_amount decimal(10,2) [default: 0.00, not null]
  variance_percentage decimal(5,2) [default: 0.00, not null]
  ai_suggested_amount decimal(10,2)
  ai_confidence_score decimal(3,2)
  created_at timestamp [not null]
  updated_at timestamp [not null]
}

// AI Insights table - AI-generated insights
Table ai_insights {
  id uuid [pk]
  user_id uuid [ref: > users.id, not null]
  title varchar(255) [not null]
  description text [not null]
  insight_type varchar(50) [not null]
  category varchar(50) [not null]
  content jsonb [not null]
  summary text
  ai_model_used varchar(50)
  ai_confidence_score decimal(3,2)
  ai_processing_time integer
  ai_tokens_used integer
  data_period_start timestamp
  data_period_end timestamp
  affected_categories jsonb
  affected_accounts jsonb
  potential_savings decimal(10,2)
  impact_score integer
  is_read boolean [default: false, not null]
  is_actioned boolean [default: false, not null]
  action_taken varchar(100)
  user_feedback varchar(20)
  is_active boolean [default: true, not null]
  priority varchar(20) [default: 'medium', not null]
  scheduled_for timestamp
  expires_at timestamp
  created_at timestamp [not null]
  updated_at timestamp [not null]
  is_deleted boolean [default: false, not null]
  deleted_at timestamp
}

// Audit Logs table - System audit trail
Table audit_logs {
  id uuid [pk]
  user_id uuid [ref: > users.id]
  action varchar(100) [not null]
  entity_type varchar(50) [not null]
  entity_id uuid
  old_values jsonb
  new_values jsonb
  changed_fields jsonb
  ip_address varchar(45)
  user_agent text
  session_id varchar(255)
  description text
  audit_metadata jsonb
  severity varchar(20) [default: 'info', not null]
  is_sensitive boolean [default: false, not null]
  created_at timestamp [not null]
}

// Indexes for better performance
TableIndexes {
  (users.email)
  (categories.user_id)
  (categories.parent_id)
  (accounts.user_id)
  (transactions.user_id)
  (transactions.from_account_id)
  (transactions.to_account_id)
  (transactions.category_id)
  (transactions.transaction_date)
  (budgets.user_id)
  (budget_items.budget_id)
  (budget_items.category_id)
  (ai_insights.user_id)
  (audit_logs.user_id)
  (audit_logs.created_at)
}
"""

    return schema


def main():
    """Main function to generate and display the ER diagram schema."""
    print("🎯 SpendAhead Database ER Diagram Generator")
    print("=" * 50)

    schema = generate_dbdiagram_schema()

    print("\n📋 Copy the following schema to https://dbdiagram.io/d:")
    print("=" * 50)
    print(schema)
    print("=" * 50)

    # Save to file
    output_file = backend_dir / "database_schema.dbml"
    with open(output_file, "w") as f:
        f.write(schema)

    print(f"\n💾 Schema saved to: {output_file}")
    print("\n🚀 Next steps:")
    print("1. Go to https://dbdiagram.io/d")
    print("2. Click 'Create New Diagram'")
    print("3. Paste the schema above")
    print("4. Click 'Save' to generate your ER diagram")
    print("\n✨ Your ER diagram will show all relationships between tables!")


if __name__ == "__main__":
    main()
