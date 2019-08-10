package com.jhispter.tasktest.web.rest.vm;

public class MonthWiseStatistics {
	int month;
	long count;
	
	public long getCount() {
		return count;
	}
	public void setCount(long count) {
		this.count = count;
	}
	
	public MonthWiseStatistics(int month,long count) {
		this.month=month;
		this.count=count;
	}
	public int getMonth() {
		return month;
	}
	public void setMonth(int month) {
		this.month = month;
	}
	public String getMonthText() {
		return monthText;
	}
	public void setMonthText(String monthText) {
		this.monthText = monthText;
	}
	public Double getActualTotal() {
		return actualTotal;
	}
	public void setActualTotal(Double actualTotal) {
		this.actualTotal = actualTotal;
	}
	String monthText;
    Double actualTotal;
    
}
