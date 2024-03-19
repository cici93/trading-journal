﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using TradingJournal.Data;

#nullable disable

namespace TradingJournal.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240319141900_removenullable")]
    partial class removenullable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("TradingJournal.Models.Position", b =>
                {
                    b.Property<int>("PositionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("PositionId"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Label")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PositionState")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Roi")
                        .HasColumnType("double precision");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("PositionId");

                    b.ToTable("Positions");
                });

            modelBuilder.Entity("TradingJournal.Models.Transaction", b =>
                {
                    b.Property<int>("TransactionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("TransactionId"));

                    b.Property<string>("AssetType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Commission")
                        .HasColumnType("double precision");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Currency")
                        .HasColumnType("text");

                    b.Property<string>("Notes")
                        .HasColumnType("text");

                    b.Property<int>("PositionId")
                        .HasColumnType("integer");

                    b.Property<double>("Quantity")
                        .HasColumnType("double precision");

                    b.Property<double>("Tax")
                        .HasColumnType("double precision");

                    b.Property<double>("Total")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("TransactionDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<double>("TransactionPrice")
                        .HasColumnType("double precision");

                    b.Property<string>("TransactionType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("TransactionId");

                    b.HasIndex("PositionId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("TradingJournal.Models.Transaction", b =>
                {
                    b.HasOne("TradingJournal.Models.Position", null)
                        .WithMany("Transactions")
                        .HasForeignKey("PositionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TradingJournal.Models.Position", b =>
                {
                    b.Navigation("Transactions");
                });
#pragma warning restore 612, 618
        }
    }
}
