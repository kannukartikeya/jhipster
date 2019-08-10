package com.jhispter.tasktest.web.rest.vm;

import java.time.Month;
import java.util.List;

public class Statistics {
	
	public void setMonth(Month month) {
		this.month = month;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public void setTotalCount(Double totalCount) {
		this.totalCount = totalCount;
	}

	public void setMonthWiseStatistics(List<MonthWiseStatistics> monthWiseStatistics) {
		this.monthWiseStatistics = monthWiseStatistics;
	}

	private Month month;
	private int year;
	private Double totalCount;

	private List<MonthWiseStatistics> monthWiseStatistics;

}
